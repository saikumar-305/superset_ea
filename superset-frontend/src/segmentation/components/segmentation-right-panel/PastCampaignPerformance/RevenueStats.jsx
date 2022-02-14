import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

/**
 * Component to show revenue stats
 */
const RevenueStats = ({ currentRevenueStats }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableContainer component={Paper} className={classes.paper}>
        <Table>
          <tbody>
            {Object.keys(currentRevenueStats).map((key, index) => {
              return (
                <TableRow key={uuidv4()}>
                  {index === 0 && (
                    <TableCell
                      rowSpan="5"
                      // className="align-middle"
                      width="30%"
                    >
                      <b>Revenue Performance</b>
                    </TableCell>
                  )}
                  <TableCell width="20%">{key.replace("_", " ")}</TableCell>
                  <TableCell width="30%">{currentRevenueStats[key]}</TableCell>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

RevenueStats.propTypes = {
  currentRevenueStats: PropTypes.object.isRequired,
};

export default RevenueStats;
