import React, { useState, useEffect } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import PropTypes from "prop-types";
import SegmentedCustomers from "./SegmentedCustomers";
import PastCampaignPerformance from "./PastCampaignPerformance/PastCampaignPerformance";
import {
  getSegmentedCustomers,
  getSegmentedCustomersByDef,
  getSegmentStats,
  getSegmentStatsByDef,
} from "../../utilities/segmentationOperations";
import CloseIcon from "@material-ui/icons/Close";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router";

/**
 * JSX Component to hold right panel
 */
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles(() => ({
  closeIcon: {
    margin: "0.5rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const SegmentationPanel = ({
  segmentIDs,
  collapse,
  segmentWhereClause,
  setCollapse,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);

  let [segmentedCustomers, setSegmentedCustomers] = useState(null);

  let [segmentedCustomersCount, setSegmentedCustomersCount] = useState(0);

  let [segmentStats, setSegmentStats] = useState(null);
  let [segmentStatsLoaded, setSegmentStatsLoaded] = useState(false);
  let [dataFetchFailedCustomers, setDataFetchFailedCustomers] = useState(false);
  let [dataFetchFailedStats, setDataFetchFailedStats] = useState(false);

  let [collapsed, setCollapsed] = useState(!!collapse);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (collapsed) {
      setCollapsed(false);
    }
  };
  useEffect(() => {
    if (typeof collapse !== "undefined") {
      setCollapse(collapsed);
    }
  }, [collapsed]);

  const loadSegmentStats = () => {
    if (segmentStatsLoaded) {
      return;
    }
    let loadStats;
    setLoading(true);
    if (segmentIDs) {
      loadStats = getSegmentStats(segmentIDs);
    } else if (segmentWhereClause) {
      loadStats = getSegmentStatsByDef(segmentWhereClause);
    }
    if (loadStats) {
      loadStats
        .then((response) => {
          if (response) {
            setSegmentStats(response.data);
            setSegmentStatsLoaded(true);
            setDataFetchFailedStats(false);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
          setDataFetchFailedStats(true);
        });
    }
  };

  const loadSegmentCustomers = () => {
    let loadCustomers;
    setLoading(true);

    if (segmentIDs) {
      loadCustomers = getSegmentedCustomers(segmentIDs);
    } else if (segmentWhereClause) {
      loadCustomers = getSegmentedCustomersByDef(segmentWhereClause);
    }
    if (loadCustomers) {
      loadCustomers
        .then((response) => {
          setSegmentedCustomers(response.data);
          setDataFetchFailedCustomers(false);
          setSegmentedCustomersCount(response.data["custCount"]);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);

          setDataFetchFailedCustomers(true);
        });
    }
  };

  const location = useLocation();
  useEffect(() => {
    if (!collapsed && segmentWhereClause?.whereClause.length > 0) {
      loadSegmentCustomers();
      loadSegmentStats();
    }
  }, [segmentWhereClause, collapsed]);

  useEffect(() => {
    if (location.pathname.includes("details")) {
      loadSegmentCustomers();
      loadSegmentStats();
    }
  }, [segmentWhereClause, collapsed]);

  useEffect(() => {
    if (location.pathname.includes("venn")) {
      loadSegmentCustomers();
      loadSegmentStats();
    }
  }, [segmentIDs, segmentWhereClause]);

  return (
    <React.Fragment>
      {loading ? (
        <div style={{ display: "grid", placeItems: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <React.Fragment>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                orientation={collapsed ? "vertical" : "horizontal"}
              >
                <Tab
                  wordWrap={false}
                  label={
                    collapsed ? (
                      <div>
                        <ChevronLeft style={{ verticalAlign: "middle" }} />
                        Details
                      </div>
                    ) : (
                      "Segmented Customers(" + segmentedCustomersCount + ")"
                    )
                  }
                />
                {!collapsed ? <Tab label="Past Campaign Performance" /> : null}
              </Tabs>
            </AppBar>
            {typeof collapse === "boolean" && !collapsed && (
              <Paper>
                <Typography align="right">
                  <CloseIcon
                    className={classes.closeIcon}
                    onClick={() => setCollapsed(!collapsed)}
                  />
                </Typography>
              </Paper>
            )}
            {!collapsed &&
              (segmentWhereClause?.whereClause.length <= 0 ? (
                <div
                  style={{
                    display: "grid",
                    placeItems: "center",
                    padding: "3rem",
                  }}
                >
                  {" "}
                  <h2>Please add a filter</h2>{" "}
                </div>
              ) : (
                <>
                  <TabPanel value={value} index={0}>
                    <SegmentedCustomers
                      key={segmentedCustomers}
                      segmentedCustomers={segmentedCustomers}
                      dataFetchFailed={dataFetchFailedCustomers}
                      loadSegmentRetry={loadSegmentCustomers}
                    />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <PastCampaignPerformance
                      key={segmentStats}
                      segmentStats={segmentStats}
                      dataFetchFailed={dataFetchFailedStats}
                      loadStatsRetry={loadSegmentStats}
                    />
                  </TabPanel>
                </>
              ))}
          </React.Fragment>
        </>
      )}
    </React.Fragment>
  );
};

SegmentationPanel.propTypes = {
  segmentIDs: PropTypes.arrayOf(PropTypes.string),
};

export default SegmentationPanel;
