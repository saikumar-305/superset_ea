import React, { useState, useEffect } from "react";
import {
  processTotalEmailStats,
  processTotalRevenueStats,
  getMinMaxDates,
  extractEmailResponseStat,
  formatDate,
  extractRevenuePerformanceStat,
} from "../../../utilities/processSegmentStats";
import DateRangeSelector from "./DateRangeSelector";
import EmailStats from "./EmailStats";
import RevenueStats from "./RevenueStats";
import PropTypes from "prop-types";
import { Button, CircularProgress } from "@material-ui/core";

/**
 * JSX component to show past campaign performance.
 * Contains <RevenueStats /> and <EmailStats />
 */
const PastCampaignPerfomance = ({
  segmentStats,
  dataFetchFailed,
  loadStatsRetry,
}) => {
  let [emailStats, setEmailStats] = useState(null);
  let [revenueStats, setRevenueStats] = useState(null);

  // Min and max Date
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);

  // Segment stats changed
  const [statsLoaded, setStatsLoaded] = useState(false);

  let [currentEmailStats, setCurrentEmailStats] = useState(null);
  let [currentRevenueStats, setCurrentRevenueStats] = useState(null);

  const calculateStats = (startDate, endDate) => {
    if (!emailStats) {
      return;
    }
    // Filter email stats array by user selected dates
    const filteredEmailStats = emailStats.filter((obj) => {
      return (
        obj.EMAIL_ISSUE_DATE >= formatDate(startDate) &&
        obj.EMAIL_ISSUE_DATE <= formatDate(endDate)
      );
    });

    // totalSent is required to calculate revenue stats
    const [totalSent, calculatedEmailStats] = extractEmailResponseStat(
      filteredEmailStats
    );
    setCurrentEmailStats(calculatedEmailStats);

    // Filter revenue performance array by user selected date
    let filteredRevenuePerformanceStat = revenueStats.filter(function (obj) {
      return (
        obj.EMAIL_DATE >= formatDate(startDate) &&
        obj.EMAIL_DATE <= formatDate(endDate)
      );
    });
    setCurrentRevenueStats(
      extractRevenuePerformanceStat(filteredRevenuePerformanceStat, totalSent)
    );
  };

  useEffect(() => {
    if (segmentStats && !statsLoaded) {
      // Set complete stats. Used when user changes the dates
      setEmailStats(segmentStats.emailResponseStat);
      setRevenueStats(segmentStats.revenuePerformanceStat);

      // Set total stats from min date to max date
      setCurrentEmailStats(
        processTotalEmailStats(segmentStats.emailResponseStat)
      );
      setCurrentRevenueStats(
        processTotalRevenueStats(segmentStats.revenuePerformanceStat)
      );

      let [minDate, maxDate] = getMinMaxDates(segmentStats.emailResponseStat);
      setMinDate(minDate);
      setMaxDate(maxDate);
      setStatsLoaded(true);
    }
  }, [segmentStats, statsLoaded]);

  return (
    <React.Fragment>
      {minDate && maxDate && (
        <DateRangeSelector
          minDate={minDate}
          maxDate={maxDate}
          onChangeHandler={calculateStats}
        />
      )}
      {currentEmailStats && (
        <EmailStats currentEmailStats={currentEmailStats} />
      )}
      {currentRevenueStats && (
        <RevenueStats currentRevenueStats={currentRevenueStats} />
      )}
      {!currentEmailStats && !currentEmailStats && !dataFetchFailed && (
        <div style={{ display: "grid", placeItems: "center" }}>
          <CircularProgress />
        </div>
      )}
      {dataFetchFailed && (
        <React.Fragment>
          Fetching segment statistics failed.{" "}
          <Button color="primary" onClick={loadStatsRetry}>
            Click to Retry
          </Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

PastCampaignPerfomance.propTypes = {
  segmentStats: PropTypes.object,
};

export default PastCampaignPerfomance;
