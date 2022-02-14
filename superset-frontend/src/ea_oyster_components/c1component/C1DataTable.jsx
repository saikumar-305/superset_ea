import React, { useCallback, useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';

import axios from 'src/ea_oyster_components/axios.js';
import { debounce } from 'lodash';
import {
  createMuiTheme,
  MuiThemeProvider,
  createTheme,
} from '@material-ui/core/styles';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withErrorHandler from 'src/ea_oyster_components/hoc/withErrorHandler/withErrorHandler';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Edit, Delete } from '@material-ui/icons';

/*********************
 * Feb, 21
 * Venky: Initial implementation
 *
 * Omkar, Vinay: styling changes
 *
 * Nov, 21
 * Saurabh: Filter save features
 *
 * Sanjay: New features to Do a Post Request instead of Get, New feature to Refetch
 *
 * Saurabh: Edit, Delete actions and control on showing individual Toolbar buttons
 *
 * Sanjay: header background color, made lighter like old Oyster with black font
 ********************/

const useStyles = makeStyles(() => ({
  RowClickable: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const C1DataTable = ({
  showFilterChip,
  defaultOrder,
  defaultOrderDirection,
  url,
  columns,
  title,
  rowsPerPage,
  rowsPerPageOptions,
  showAdd,
  isEmpty,
  statusFieldName,
  isRowsSelectable,
  onRowSelectionChange,
  onTableChangeParent,
  rowClick,
  storageKey,
  // new: optional prop to inform count
  setTotalCount,
  // new: optional props to send a POST instead of GET
  isPostData, //set it along with the URL for POST
  postData,
  isRefetchRequired,
  onDelete, //optional prop to delete a row
  onEdit, //optional prop to edit a row
  withActions, //optional prop to show actions
  showToolbarOptions, //optional prop to show toolbar options
}) => {
  const classes = useStyles();
  const getMuiTheme = () =>
    createTheme({
      overrides: {
        MUIDataTableFilterList: {
          chip: {
            display: showFilterChip === undefined ? 'display' : 'none',
          },
        },
        MuiTableCell: {
          head: {
            backgroundColor: '#f7c2cc',
            color: 'white',
          },
        },
        MUIDataTableSelectCell: {
          headerCell: {
            backgroundColor: '#f7c2cc',
          },
        },
        MUIDataTableHeadCell: {
          sortActive: {
            paddingLeft: 16,
          },
        },
      },
    });

  const editableColumns = [
    ...columns,
    {
      name: 'edit',
      label: 'Edit',
      options: {
        filter: false,
        display: withActions.edit,
        customBodyRender: (value, tableMeta) => {
          const { rowData, tableState } = tableMeta;
          return (
            <>
              {tableMeta.rowData[0] != 'Loading Data...' ? (
                <>
                  <Tooltip title="Edit">
                    <IconButton>
                      <Edit
                        onClick={e => {
                          e.stopPropagation();
                          if (onEdit) onEdit(rowData);
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <></>
              )}
            </>
          );
        },
      },
    },
    {
      name: 'delete',
      label: 'Delete',
      options: {
        filter: false,
        display: withActions.delete,
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowData, tableState } = tableMeta;
          return (
            <>
              {tableMeta.rowData[0] != 'Loading Data...' ? (
                <>
                  <Tooltip title="Delete">
                    <IconButton>
                      <Delete
                        onClick={e => {
                          e.stopPropagation();
                          if (onDelete) {
                            onDelete(rowData);
                            setTimeout(() => getData(tableState), 1000);
                          }
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <></>
              )}
            </>
          );
        },
      },
    },
  ];
  const [clolumnsWithStatus, setClolumnsWithStatus] = useState(editableColumns);

  const [c1DtState, setC1DtState] = useState({
    page: 0,
    count: 1,
    rowsPerPage: rowsPerPage === undefined ? 10 : rowsPerPage,
    previousPageNo: 0,
    sortOrder: {
      name: defaultOrder,
      direction:
        defaultOrderDirection === undefined ? 'asc' : defaultOrderDirection,
    },
    data: [['Loading Data...']],
    isLoading: false,
  });

  const [initialTableState, setInitialTableState] = useState();
  const setData = (res, isLoading) => {
    setC1DtState({
      isLoading: isLoading,
      data: res.data,
      count: res.count,
      page: res.page,
    });
  };

  const debouncedFilterSearch = useCallback(
    debounce(tableState => search(tableState), 1000, { maxWait: 2000 }),
    [],
  );

  // can occur when the caller is setting up properties for post at different times
  function isPostInvalid() {
    let isInvalid = isPostData && (postData === undefined || postData === '');
    if (isInvalid)
      console.log(
        'Internal warning: C1DataTable got a post request without post data',
      );
    return isInvalid;
  }

  const getData = tableState => {
    if (isPostInvalid()) {
      return;
    }
    setC1DtState({ isLoading: true });
    apiRequest(tableState).then(res => {
      setData(res, false);
    });
  };

  /*Called when action from onTableChange is sort */
  const sort = tableState => {
    setC1DtState({ isLoading: true });
    apiRequest(tableState).then(res => {
      setData(res, false);
    });
  };

  const changePage = tableState => {
    setC1DtState({ isLoading: false });
    apiRequest(tableState).then(res => {
      setData(res, false);
    });
  };

  const search = tableState => {
    setC1DtState({ isLoading: false });
    apiRequest(tableState).then(res => {
      setData(res, false);
    });
  };

  const reset = tableState => {
    setC1DtState({ isLoading: false });
    tableState.filterList = [];
    apiRequest(tableState).then(res => {
      setData(res, false);
    });
  };

  const apiRequest = tableState => {
    //The base url from set in props
    if (!url) {
      setC1DtState({ isLoading: true });
    }

    let baseRequestUrl = url;
    return new Promise((resolve, reject) => {
      let displayStart = getDisplayStart(tableState);
      let postRequesturl =
        '/list/json?sEcho=3&iDisplayStart=' +
        displayStart +
        '&iDisplayLength=' +
        tableState.rowsPerPage +
        getSortParam(columns, tableState) +
        getQueryFieldParams(columns, tableState);

      let requestUrl = baseRequestUrl + postRequesturl;

      setC1DtState({ previousPageNo: tableState.rowsPerPage });

      let request;
      if (!isPostData) request = axios.get(requestUrl);
      else request = axios.post(requestUrl, postData);
      request
        .then(result => {
          if (setTotalCount !== undefined)
            setTotalCount(result.data.iTotalRecords);
          resolve({
            data: result.data.aaData,
            page: displayStart > 0 ? tableState.page : 0,
            count: result.data.iTotalRecords,
          });
        })
        .catch(error => {
          //todo: Improve this
          console.log(error);
        });
    });
  };

  useEffect(() => {
    if (!isRefetchRequired) return;
    if (isPostInvalid()) return;
    // fetch again if postData or url has changed
    if (initialTableState) getData(initialTableState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postData, url, isRefetchRequired]);

  const getDisplayStart = tableState => {
    if (c1DtState.previousPageNo === tableState.page) {
      return 0;
    }

    return tableState.page * tableState.rowsPerPage;
  };

  const getQueryFieldParams = (columns, tableState) => {
    let idx = 0;
    let [sortFieldName, sortDirection] = getSortFieldNameAndDirection(
      columns,
      tableState,
    );

    let fieldParams = '';

    if (sortDirection) {
      fieldParams = '&mDataProp_' + idx + '=' + sortFieldName;
      idx++;
    }

    if (tableState.filterList) {
      for (let i = 0; i < tableState.filterList.length; i++) {
        let filter = tableState.filterList[i];

        if (filter.length > 0) {
          fieldParams +=
            '&mDataProp_' +
            idx +
            '=' +
            tableState.columns[i].name +
            '&sSearch_' +
            idx +
            '=' +
            filter;
          idx++;
        }
      }
    }
    fieldParams = fieldParams + '&iColumns=' + idx;
    return fieldParams;
  };

  const getSortParam = (editableColumns, tableState) => {
    let [sortFieldName, sortDirection] = getSortFieldNameAndDirection(
      editableColumns,
      tableState,
    );

    if (sortDirection) {
      return '&iSortCol_0=0&sSortDir_0=' + sortDirection + '&iSortingCols=1';
    }

    return '&iSortCol_0=0&sSortDir_0=asc&iSortingCols=0';
  };

  const getSortFieldNameAndDirection = (editableColumns, tableState) => {
    if (tableState.sortOrder && tableState.sortOrder.name) {
      setC1DtState({
        ...c1DtState,
        sortOrder: {
          name: tableState.sortOrder.name,
          direction: tableState.sortOrder.direction,
        },
      });
      return [tableState.sortOrder.name, tableState.sortOrder.direction];
    }

    const retVal = getDefaultSortFieldNameAndDirection(editableColumns);

    return retVal;
  };

  const getDefaultSortFieldNameAndDirection = editableColumns => {
    let columnsTmp = editableColumns;
    columnsTmp = columnsTmp.filter(column => {
      return !column.options.sort;
    });

    if (columnsTmp) {
      return [columnsTmp[0].field, columnsTmp[0].options.sort];
    }

    return null;
  };

  const {
    isShowDownload,
    isShowPrint,
    isShowViewColumns,
    isShowFilter,
    isShowAdd,
  } = showToolbarOptions;

  console.log('Inside C1DataTable');

  useEffect(() => {
    if (statusFieldName) {
      const statusColumn = {
        name: statusFieldName,
        label: 'Status',
        options: {
          filter: true,
          filterType: 'dropdown',
          filterOptions: {
            names: ['A', 'I'],
            renderValue: v => {
              if (v === 'A') {
                return 'Active';
              } else if (v === 'I') {
                return 'InActive';
              }
            },
          },
          customFilterListOptions: {
            render: v => {
              if (v === 'A') {
                return 'Active';
              } else if (v === 'I') {
                return 'InActive';
              }
            },
          },
          customBodyRender: (value, tableMeta, updateValue) => {
            if (value === 'A')
              return (
                <small className="px-1 py-2px bg-light-green text-green border-radius-4">
                  Active
                </small>
              );
            else if (value === 'I')
              return (
                <small className="px-1 py-2px bg-light-red text-red border-radius-4">
                  Inactive
                </small>
              );
          },
        },
      };
      editableColumns.splice(-1, 0, statusColumn);
      setClolumnsWithStatus(editableColumns);
    }
  }, [editableColumns, statusFieldName]);

  return (
    <>
      <MUIDataTable
        title={title}
        data={c1DtState.data || [['Loading Data...']]}
        columns={clolumnsWithStatus}
        options={{
          storageKey: storageKey,
          customToolbarSelect: () => {},
          customToolbar: isShowAdd
            ? () => {
                if (isShowAdd.path) {
                  return (
                    <Link to={isShowAdd.path}>
                      <Tooltip title="Add" aria-label="add">
                        <Button>
                          <AddBoxIcon
                            viewBox="0 0 24 24"
                            color="primary"
                          ></AddBoxIcon>
                        </Button>
                      </Tooltip>
                    </Link>
                  );
                }
              }
            : null,
          onRowSelectionChange: onRowSelectionChange,
          fixedHeader: false,
          count: c1DtState.count,
          page: !storageKey ? c1DtState.page : undefined,
          rowsPerPage: c1DtState.rowsPerPage,
          sortOrder: c1DtState.sortOrder,
          download: isShowDownload === undefined ? true : isShowDownload,
          filter: isShowFilter === undefined ? true : isShowFilter,
          print: isShowPrint === undefined ? true : isShowPrint,
          viewColumns:
            isShowViewColumns === undefined ? true : isShowViewColumns,
          selectableRows: isRowsSelectable ? isRowsSelectable : 'multiple', //"multiple", "single", "none". default is multiple
          filterType: 'textField',
          responsive: 'standard',
          enableNestedDataAccess: '.',
          onRowClick: rowClick || (() => {}),
          // selectableRows: "none", // set checkbox for each row
          // search: false, // set search option
          // filter: false, // set data filter option
          // download: false, // set download option
          // print: false, // set print option
          pagination: true, //set pagination option
          // viewColumns: false, // set column option
          elevation: 0,
          rowsPerPageOptions:
            rowsPerPageOptions === undefined
              ? [10, 20, 40, 80, 100]
              : rowsPerPageOptions,
          //disables the search icon in the toolbar
          search: false,
          serverSide: isEmpty ? false : true,
          setRowProps: () => {
            return {
              className: clsx({
                [classes.RowClickable]: !!rowClick,
              }),
            };
          },
          // customSort: (data, colIndex, order, meta) => {

          //     return data.sort((a, b) => {
          //         return (a.data[colIndex].length < b.data[colIndex].length ? -1 : 1) * (order === 'desc' ? 1 : -1);
          //     });
          // },
          onTableChange: (action, tableState) => {
            // a developer could react to change on an action basis or
            // examine the state as a whole and do whatever they want
            switch (action) {
              case 'changePage':
                changePage(tableState);
                break;
              case 'sort':
                sort(tableState);
                break;
              case 'changeRowsPerPage':
                getData(tableState);
                break;
              case 'filterChange':
                debouncedFilterSearch(tableState);
                break;
              case 'resetFilters':
                reset(tableState);
                break;
              default:
                //console.log("action not handled.");
                break;
            }
            onTableChangeParent(action, tableState);
          },
          onTableInit: (action, tableState) => {
            // remember initial table state for use in refetch
            if (!initialTableState) setInitialTableState(tableState);
            getData(tableState);
          },
        }}
      />
    </>
  );
};

// C1DataTable.propTypes = {
//   showFilterChip: PropTypes.string,
//   defaultOrder: PropTypes.string,
//   defaultOrderDirection: PropTypes.string,
//   url: PropTypes.string.isRequired,
//   columns: PropTypes.array.isRequired,
//   title: PropTypes.string,
//   showAdd: PropTypes.object,
//   isEmpty: PropTypes.bool,
//   onRowsSelectionChange: PropTypes.func,
//   onTableChangeParent: PropTypes.func,
//   rowClick: PropTypes.func,
//   onDelete: PropTypes.func,
//   onEdit: PropTypes.func,
//   withActions: PropTypes.shape({
//     edit: PropTypes.bool,
//     delete: PropTypes.bool,
//   }),
//   showToolbarOptions: PropTypes.shape({
//     isShowDownload: PropTypes.bool,
//     isShowPrint: PropTypes.bool,
//     isShowViewColumns: PropTypes.bool,
//     isShowFilter: PropTypes.bool,
//   }),
// };

export default C1DataTable;
