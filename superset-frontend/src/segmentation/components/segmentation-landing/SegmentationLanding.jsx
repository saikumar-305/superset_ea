import React, { useState, useContext, useEffect } from 'react';
import C1DataTable from 'src/ea_oyster_components/c1component/C1DataTable';
import { Container, Button, Grid, Divider, Card } from '@material-ui/core';
import {
  cloneOperation,
  deleteOperation,
} from '../../utilities/segmentationOperations';
import {
  FilterContextProvider,
  FilterContext,
} from '../../context/FilterContext';
import useSnackbar from 'src/ea_oyster_components/components/useSnackbar';
import ErrorBoundary from 'src/components/ErrorBoundary';
import history from 'src/ea_oyster_components/history.js';
import useSegmentDelete from '../useSegmentDelete';
import useSegmentClone from '../useSegmentClone';
import API_PATHS from 'src/ea_oyster_components/constants/apiPaths';
import C1ListPanel from 'src/ea_oyster_components/c1component/C1ListPanel';
import axios from 'src/ea_oyster_components/axios';

const SegmentationLanding = () => {
  const { modifySegmentDetails } = useContext(FilterContext);

  let [selectedRows, setSelectedRows] = useState([]);

  const [SnackBar, openSnackBar] = useSnackbar('', 'success');
  const [dataTableRender, reRenderDataTable] = useState(0);

  const [cloneDeleteDisabled, setCloneDeleteDisabled] = useState(true);
  const [vennDiagramDisabled, setVennDiagramDisabled] = useState(true);

  useEffect(() => {
    modifySegmentDetails('', '', '');
  }, []);
  // const [cloneDialogOpen, setCloneDialogOpen] = React.useState(false);

  // Segment delete handler. This calls the API and triggers re-render of segmentation table
  const handleDeleteSegment = () => {
    const requestBody = {};
    requestBody['IDs'] = selectedRows.map(elem => elem.id);
    requestBody['segmentTitles'] = selectedRows.map(elem => elem.segmenttitle);
    deleteOperation(requestBody)
      .then(() => openSnackBar('Successfully deleted!', 'success'))
      .catch(() => openSnackBar('Deletion failed!', 'error'))
      .finally(() => {
        setDialogOpen(false);
        updateSegmentationDataTable();
      });
  };

  // Init custom hook for deleting segment
  const [setDialogOpen, SegmentationDelete] =
    useSegmentDelete(handleDeleteSegment);

  const handleCloneOpen = () => {
    setCloneDialogOpen(true);
  };

  const handleDeleteDialogOpen = () => {
    setDialogOpen(true);
  };

  const updateSegmentationDataTable = () => {
    reRenderDataTable(dataTableRender + 1);
    setSelectedRows([]);
    setCloneDeleteDisabled(true);
  };

  const cloneSubmit = values => {
    const requestBody = {};
    requestBody['sc_clone_name'] = values.segName;
    requestBody['sc_clone_description'] = values.description;
    requestBody['sc_clone_tagname'] = values.tagName;
    requestBody['sc_id'] = selectedRows[0].id.toString();
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
      })
      .finally(() => {
        updateSegmentationDataTable();
      });
  };

  // Custom hook for cloning segment
  const [setCloneDialogOpen, SegmentationClone] = useSegmentClone(cloneSubmit);

  const columns = [
    {
      name: 'id',
      label: 'ID',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'segmenttitle',
      label: 'Segment Title',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'recDtLupd',
      label: 'Last Modified Date',
      options: {
        filter: true,
        sort: true,
      },
    },
    /* {
      name: "userCount",
      label: "User Count",
      options: {
        filter: true,
        sort: true,
      },
    },*/
  ];

  const actions = {
    edit: false,
    delete: true,
  };

  const showToolbarOptions = {
    isShowDownload: false,
    isShowPrint: false,
    isShowViewColumns: true,
    isShowFilter: true,
    isShowAdd: {
      path: '/segmentation/create',
    },
  };

  const getSelectedRows = tableState => {
    const selectedIndexes = [];
    tableState.selectedRows.data.forEach(value =>
      selectedIndexes.push(value.index),
    );
    const selectedRows = [];
    selectedIndexes.forEach(index => {
      tableState.data.forEach(dataTableItem => {
        if (dataTableItem.index === index) {
          const row = {};
          dataTableItem.data.forEach((value, index) => {
            row[tableState.columns[index].name] = value;
          });
          selectedRows.push(row);
        }
      });
    });
    return selectedRows;
  };
  console.log('Inside Landing Page');

  const columns2 = ['Name', 'Company', 'City', 'State'];

  const data = [
    ['Joe James', 'Test Corp', 'Yonkers', 'NY'],
    ['John Walsh', 'Test Corp', 'Hartford', 'CT'],
    ['Bob Herm', 'Test Corp', 'Tampa', 'FL'],
    ['James Houston', 'Test Corp', 'Dallas', 'TX'],
  ];

  const options = {
    filterType: 'checkbox',
  };

  return (
    <C1ListPanel routeSegments={[{ name: 'Segmentation List' }]}>
      <Card elevation={3}>
        <Divider className="mb-2" />
        <Container>
          <Container>
            <div className="mb-3 mt-3">
              <Grid justify="space-between" container>
                <Grid item>
                  <Button
                    variant="contained"
                    className="mr-3"
                    onClick={handleCloneOpen}
                    disableElevation
                    disabled={cloneDeleteDisabled}
                    disableRipple={true}
                  >
                    Clone
                  </Button>
                  <Button
                    variant="contained"
                    className="mr-3"
                    disableElevation
                    disabled={cloneDeleteDisabled}
                    onClick={handleDeleteDialogOpen}
                    disableRipple={true}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    disableElevation
                    disabled={vennDiagramDisabled}
                    onClick={() => {
                      const selectedIds = selectedRows.map(row => row.id);
                      history.push({
                        pathname: `/segmentation/venn/${selectedIds.join(',')}`,
                      });
                    }}
                    disableRipple={true}
                  >
                    Add to Venn Diagram
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={() => {
                      history.push('/segmentation/create');
                    }}
                  >
                    Create New Segment
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
          {/* <C1DataTable /> */}
          <C1DataTable
            showToolbarOptions={showToolbarOptions}
            storageKey="customer-segmentation"
            withActions={actions}
            deleteHandler={handleDeleteDialogOpen}
            // editHandler = {}
            key={dataTableRender}
            url={API_PATHS.SEGEMENTATION.GET_SEGMENTS}
            columns={columns}
            defaultOrder="recDtLupd"
            defaultOrderDirection="desc"
            rowClick={rowData =>
              history.push({
                pathname: `/segmentation/details/${rowData[0]}`,
              })
            }
            onTableChangeParent={(action, tableState) => {
              if (action === 'rowSelectionChange') {
                let selectedRows = getSelectedRows(tableState);
                setSelectedRows(selectedRows);
                setCloneDeleteDisabled(selectedRows.length !== 1);
                setVennDiagramDisabled(
                  selectedRows.length !== 2 && selectedRows.length !== 3,
                );
              }
            }}
          />
          <SegmentationClone />
          {/* <Dialog
        open={cloneDialogOpen}
        onClose={handleCloneClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Clone</DialogTitle>
        <Formik
          initialValues={{ segName: "", description: "", tagName: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.segName) {
              errors.segName = "Required";
            }
            return errors;
          }}
          onSubmit={cloneSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
            dirty,
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  margin="dense"
                  id="segName"
                  label="Segment Name"
                  type="text"
                  value={values.segName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
                <div style={{ color: "red" }}>
                  {errors.segName && touched.segName && errors.segName}
                </div>
                <TextField
                  margin="dense"
                  id="description"
                  label="Description"
                  type="text"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="tagName"
                  label="Tag Name"
                  type="text"
                  value={values.tagName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloneClose} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={handleCloneClose}
                  color="primary"
                  disabled={!(isValid && dirty) || isSubmitting}
                  type="submit"
                >
                  Clone
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog> */}
          <SegmentationDelete />
          <SnackBar />
        </Container>
      </Card>
    </C1ListPanel>
  );
};

export default function SegmentationWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <FilterContextProvider>
        <SegmentationLanding {...props} />;
      </FilterContextProvider>
    </ErrorBoundary>
  );
}
