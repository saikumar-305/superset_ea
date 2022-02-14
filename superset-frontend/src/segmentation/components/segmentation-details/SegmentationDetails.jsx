import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, CircularProgress, Button } from '@material-ui/core';
import { getSingleSegmentView } from '../../utilities/segmentationOperations';
import SegmentationPanel from '../segmentation-right-panel/SegmentationPanel';
import { parseWhereClause } from '../../utilities/segmentationUtils';
import useSegmentDelete from '../useSegmentDelete';
import {
  cloneOperation,
  deleteOperation,
  sendToEpsilon,
  getColumnNamesForChecklist,
} from '../../utilities/segmentationOperations';
import useSnackbar from 'src/ea_oyster_components/components/useSnackbar';
import history from 'src/ea_oyster_components/history';
import useSegmentClone from '../useSegmentClone';
import SegmentHeader from '../segmentHeader';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import { RegularColumnList, RebidColumnList } from './ExportColumnList';
import JWTAuthContext from 'src/ea_oyster_components/contexts/JWTAuthContext';
import { MatxLoading } from 'src/ea_oyster_components/matx';

/**
 * JSX component - Segmentation details screen. Holds the segment header, right panel
 */
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const SegmentationDetails = ({ match }) => {
  if (!match.params.segmentID) {
    this.history.push({
      pathname: `/segmentation`,
    });
  }

  const [segmentID] = useState(match.params.segmentID);
  const [segment, setSegment] = useState(null);
  const [whereClause, setWhereClause] = useState(null);
  const { user } = useContext(JWTAuthContext);
  const [columnList, setColumnList] = useState(null);
  const [loading, setLoading] = useState(false);

  // Snackbar for clone and delete
  const [SnackBar, openSnackBar] = useSnackbar('', 'success');

  // Segment delete handler. This calls the API and triggers re-render of segmentation table
  const handleDeleteSegment = () => {
    const requestBody = {};
    requestBody['IDs'] = [parseInt(segmentID)];
    requestBody['segmentTitles'] = [segment.SEGMENTTITLE];
    deleteOperation(requestBody)
      .then(() => openSnackBar('Successfully deleted!', 'success'))
      .catch(() => openSnackBar('Deletion failed!', 'error'))
      .finally(() => {
        setDialogOpen(false);
        history.push('/segmentation');
      });
  };

  // Init custom hook for deleting segment
  const [setDialogOpen, SegmentationDelete] =
    useSegmentDelete(handleDeleteSegment);

  const cloneSubmit = values => {
    const requestBody = {};
    requestBody['sc_clone_name'] = values.segName;
    requestBody['sc_clone_description'] = values.description;
    requestBody['sc_clone_tagname'] = values.tagName;
    requestBody['sc_id'] = segmentID.toString();
    cloneOperation(requestBody)
      .then(response => {
        if (response.data === 'Success') {
          openSnackBar('Cloned Successfully!', 'success');
        } else {
          openSnackBar('Cloning failed. Please try again.', 'error');
        }
      })
      .catch(() => {
        openSnackBar('Cloning failed. Please try again.', 'error');
      });
  };

  const [setCloneDialogOpen, SegmentationClone] = useSegmentClone(cloneSubmit);

  //send column list and segment id to EPSILON
  const handleSendToEpsilon = () => {
    const requestBody = {};
    requestBody['columns'] = checked;
    requestBody['segment_id'] = segmentID.toString();
    setLoading(true);
    sendToEpsilon(requestBody)
      .then(() => {
        setLoading(false);
        openSnackBar('Created Export Job successfully', 'success');
      })
      .catch(() => {
        setLoading(false);
        openSnackBar('Operation failed!', 'error');
      });
  };

  useEffect(() => {
    let mounted = true;
    getSingleSegmentView(segmentID)
      .then(response => {
        if (!mounted) {
          return;
        }
        setSegment(response.data['JSN'][0]);
        setWhereClause(parseWhereClause(response.data['Whr']));

        if (user.clientId === 801) {
          setColumnList(RebidColumnList);
          setChecked(RebidColumnList);
        } else {
          setColumnList(RegularColumnList);
          setChecked(RegularColumnList);
        }
      })
      .catch(() => {});
    return () => {
      //Clean up
      mounted = false;
    };
  }, [segmentID]);

  //epsilon dilog open/close
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //set columns checkbox
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  //fetch column names
  // const [columnList, setColumnList] = useState([]);
  // const handleColumnList = () => {
  //   getColumnNamesForChecklist()
  //     .then((response) => {
  //       setColumnList(response.data);
  //       setOpen(true);
  //     })
  //     .catch(() => openSnackBar("Attributes fetch failed!", "error"));
  // };

  //helper method
  function sentenceCase(str) {
    if (str === null || str === '') return false;
    else str = str.toString();
    return (str = str.replace(/_/g, ' ').toUpperCase());
  }

  //select all functinality
  // const [isCheckAll, setIsCheckAll] = useState(false);
  // const [isCheck, setIsCheck] = useState([]);

  // const handleSelectAll = e => {
  //   setIsCheckAll(!isCheckAll);
  //   setIsCheck(list.map(li => li.id));
  //   if (isCheckAll) {
  //     setIsCheck([]);
  //   }
  // };

  console.log('Hello From Details');

  return (
    <React.Fragment>
      {segment && (
        <Container className="mt-2">
          <Grid container justify="space-between">
            <Grid item>
              <h4>Segment Definition</h4>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                className="mr-3"
                disableElevation
                disableRipple={true}
                //onClick={handleColumnList}
                onClick={handleClickOpen}
              >
                Export to File Server
              </Button>
              {columnList && (
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogContent>
                    <h4>Check the attributes you want to export.</h4>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<CloudUploadIcon />}
                      onClick={handleSendToEpsilon}
                    >
                      Start Export to File Server
                    </Button>

                    <List className={classes.root}>
                      {/*<Checkbox
                        type="checkbox"
                        name="selectAll"
                        id="selectAll"
                        //handleClick={handleSelectAll}
                        //isChecked={isCheckAll}
                      >
                        Select All
                      </Checkbox>*/}
                      {loading && <MatxLoading />}
                      {columnList.map(value => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                          <ListItem
                            key={value}
                            role={undefined}
                            dense
                            button
                            onClick={handleToggle(value)}
                            // onChange={(e) => handleChange(e, value)}
                          >
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              id={labelId}
                              primary={sentenceCase(`${value}`)}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </DialogContent>
                </Dialog>
              )}
              <Button
                variant="contained"
                className="mr-3"
                onClick={() =>
                  history.push({
                    pathname: `/segmentation/edit/${segmentID}`,
                  })
                }
                disableElevation
                disableRipple={true}
              >
                Edit Segment
              </Button>

              <Button
                variant="contained"
                className="mr-3"
                onClick={() => setCloneDialogOpen(true)}
                disableElevation
                disableRipple={true}
              >
                Clone
              </Button>
              <Button
                variant="contained"
                disableElevation
                disabled={false}
                onClick={() => {
                  setDialogOpen(true);
                }}
                disableRipple={true}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
          <hr />
          <SegmentHeader segment={segment} disabled={true} />
          <Grid container spacing={2}>
            <Grid item md={3} sm={12}>
              <span dangerouslySetInnerHTML={{ __html: whereClause }}></span>
            </Grid>
            <Grid item md={9} sm={12}>
              <SegmentationPanel segmentIDs={[segmentID]} />
            </Grid>
          </Grid>
        </Container>
      )}{' '}
      {!segment && (
        <Container>
          <CircularProgress
            style={{ position: 'relative', top: '45%', left: '45%' }}
          />
        </Container>
      )}
      <SegmentationDelete />
      <SegmentationClone />
      <SnackBar />
    </React.Fragment>
  );
};

export default SegmentationDetails;
