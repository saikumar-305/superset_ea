import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  rowBorder: {
    border: "3px #ee6c85 solid",
  },
}));

const LeftTable = ({ vennReport, selectedSegments, setSelectedSegments }) => {
  const classes = useStyles();
  return (
    <>
      {vennReport && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ padding: "0.5rem" }}>Segments</TableCell>
                <TableCell align="right" style={{ padding: "0.5rem" }}>
                  Count
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vennReport.map((row) => (
                <TableRow
                  key={uuidv4()}
                  className={clsx({
                    [classes.rowBorder]:
                      selectedSegments === row.sets.join(","),
                  })}
                  onClick={() => setSelectedSegments(row.sets.join(","))}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ padding: "0.25rem" }}
                  >
                    {row.segmentationLabel}
                  </TableCell>
                  <TableCell align="right" style={{ padding: "0.25rem" }}>
                    {row.size}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default LeftTable;
