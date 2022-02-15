import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';
import { saveSegment } from '../../utilities/createSegmentOperations';
import { FilterContext } from '../../context/FilterContext';
import JWTAuthContext from 'src/ea_oyster_components/contexts/JWTAuthContext';
import useSnackbar from 'src/ea_oyster_components/components/useSnackbar';
import history from 'src/ea_oyster_components/history';

const useStyles = makeStyles(() => ({
  segmentFooter: {
    width: '100%',
    padding: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtn: {
    paddingRight: '1rem',
  },
}));

const SaveSegment = ({ match }) => {
  const classes = useStyles();
  const [editMode] = useState(match.url.includes('/segmentation/edit/'));

  const { segmentDetails, selectedClauses } = useContext(FilterContext);
  const { user } = useContext(JWTAuthContext);

  // Snackbar for clone and delete
  const [SnackBar, openSnackBar] = useSnackbar('', 'success');

  const saveSegmentHandler = () => {
    const whereClauses = selectedClauses.map(el => el['whereClause']);
    let segment = { ...segmentDetails, U_ID: user['userId'].toString() };
    if (editMode) {
      segment = {
        ...segment,
        isSegEdit: editMode.toString(),
        SegmentID: match.params.segmentID,
        IsDraft: '0',
      };
    }
    saveSegment(segment, whereClauses)
      .then(response => {
        if (response.data['message'] === 'Success') {
          // show snackbar
          editMode
            ? openSnackBar('Segment Edited!', 'success')
            : openSnackBar('Segment Created!', 'success');
          // Redirect to segmentation home page
          window.setTimeout(() => history.push('/'), 3000);
        }
      })
      .catch(error => {
        console.error(error);
        if (error.response && error.response.status === 409) {
          // Show snackbar
          openSnackBar(
            `Segment with the name ${segmentDetails.SegmentTitle} is already present`,
            'warning',
          );
        } else {
          // Show snackbar
          openSnackBar(
            `Error occured while creating segment. Please try again later`,
            'error',
          );
        }
      });
  };

  return (
    <React.Fragment>
      <Paper elevation={3} className={classes.segmentFooter}>
        <Button
          variant="contained"
          color="primary"
          className={classes.saveBtn}
          onClick={saveSegmentHandler}
          disabled={!segmentDetails.SegmentTitle.length}
        >
          Save
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            history.push(`/details/${match.params.segmentID}`);
          }}
        >
          Cancel
        </Button>
      </Paper>
      <SnackBar />
    </React.Fragment>
  );
};

export default SaveSegment;
