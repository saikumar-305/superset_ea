import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  table: {
    minWidth: 1000,
    tableLayout: "auto",
  },
  tableCell: {
    padding: "0px 8px",
    width: "auto",
    whiteSpace: "nowrap",
  },
});

/**
 * JSX component - Holds the segmented customers list
 */
const SegmentedCustomers = ({
  segmentedCustomers,
  dataFetchFailed,
  loadSegmentRetry,
}) => {
  let [columnNames, setColumnNames] = useState(null);
  let [segCustomers, setSegmentedCustomers] = useState(null);

  useEffect(() => {
    if (segmentedCustomers) {
      setSegmentedCustomers(segmentedCustomers.SegCust);
      setColumnNames(segmentedCustomers.columnNames);
    }
    return () => {
      // cleanup;
    };
  }, [segmentedCustomers]);

  const classes = useStyles();
  return (
    <React.Fragment>
      {columnNames && segCustomers && (
        <React.Fragment>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="medium">
              <TableHead>
                <TableRow>
                  {columnNames.map((value) => (
                    <TableCell className={classes.tableCell} key={value}>
                      {value.toUpperCase()}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {segCustomers.map((row) => (
                  <TableRow key={uuidv4()}>
                    {row.map((val) => (
                      <TableCell className={classes.tableCell} key={uuidv4()}>
                        {val}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </React.Fragment>
      )}

      {!segmentedCustomers && !dataFetchFailed && (
        <div style={{ display: "grid", placeItems: "center" }}>
          <CircularProgress />{" "}
        </div>
      )}
      {dataFetchFailed && (
        <React.Fragment>
          Error occured in fetching segmented customers.
          <Button onClick={loadSegmentRetry} color="primary">
            Click to Retry
          </Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

SegmentedCustomers.propTypes = {
  segmentedCustomers: PropTypes.object,
};

export default SegmentedCustomers;
