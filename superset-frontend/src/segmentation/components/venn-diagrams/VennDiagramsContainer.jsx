import React, { useState, useEffect, useContext } from "react";
import LeftTable from "./LeftTable";
import { getVennReport } from "./vennDiagramOperations";
import VennDiagram from "./VennDiagram";
import { Grid, Paper } from "@material-ui/core";
import SegmentationPanel from "../segmentation-right-panel/SegmentationPanel";
import { makeStyles } from "@material-ui/core/styles";
import {
  FilterContext,
  FilterContextProvider,
} from "../../context/FilterContext";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     width: "100px",
//     height: "100px",
//   },
// }));

const VennDiagramContainer = ({ match }) => {
  //const classes = useStyles();
  if (!match.params.segmentIDs) {
    this.history.push({
      pathname: `/segmentation`,
    });
  }

  const setDefaultSegment = () => {
    if (!vennReport) {
      return null;
    } else {
      return vennReport[0].sets.join(",");
    }
  };

  const [segmentIDs] = useState(match.params.segmentIDs);
  const [vennReport, setVennReport] = useState(null);
  const [selectedSegments, setSelectedSegments] = useState(setDefaultSegment());
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(true);

  useEffect(() => {
    getVennReport(segmentIDs)
      .then((response) => {
        setVennReport(response.data);
        setSelectedSegments(response.data[0].sets.join(","));
      })
      .catch(console.error);
    return () => {
      // cleanup
    };
  }, []);

  return (
    <>
      <Grid container width="100%">
        {rightPanelCollapsed ? (
          <>
            <Grid item xs={3}>
              <LeftTable
                vennReport={vennReport}
                selectedSegments={selectedSegments}
                setSelectedSegments={setSelectedSegments}
              />
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                display: "grid",
                placeItems: "center",
                zoom: 1.4,
              }}
            >
              <Paper>
                <VennDiagram
                  vennReport={vennReport}
                  setSelectedSegments={setSelectedSegments}
                  selectedSegments={selectedSegments}
                />
              </Paper>
            </Grid>
            <Grid item xs={3}>
              {selectedSegments && (
                <SegmentationPanel
                  segmentIDs={selectedSegments.split(",")}
                  // key={selectedSegments}
                  collapse={true}
                  setCollapse={setRightPanelCollapsed}
                />
              )}
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={3}>
              <LeftTable
                vennReport={vennReport}
                selectedSegments={selectedSegments}
                setSelectedSegments={setSelectedSegments}
              />
              <Paper>
                <VennDiagram
                  vennReport={vennReport}
                  setSelectedSegments={setSelectedSegments}
                  selectedSegments={selectedSegments}
                />
              </Paper>
            </Grid>
            <Grid item xs={9}>
              {selectedSegments && (
                <SegmentationPanel
                  segmentIDs={selectedSegments.split(",")}
                  // key={selectedSegments}
                  collapse={false}
                  setCollapse={setRightPanelCollapsed}
                />
              )}
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default VennDiagramContainer;
