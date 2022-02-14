import React from "react";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

/**
 * Component to show email stats.
 */
const EmailStats = ({ currentEmailStats }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table>
        <tbody>
          {Object.keys(currentEmailStats).map((key, index) => {
            return (
              <TableRow key={uuidv4()}>
                {index === 0 && (
                  <TableCell rowSpan="5" width="30%">
                    <b>Email Reponse Behaviour</b>
                  </TableCell>
                )}
                <TableCell width="20%">{key.replace("_", " ")}</TableCell>
                <TableCell width="30%">{currentEmailStats[key]}</TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </TableContainer>
  );
};

EmailStats.propTypes = {
  currentEmailStats: PropTypes.object.isRequired,
};

export default EmailStats;
