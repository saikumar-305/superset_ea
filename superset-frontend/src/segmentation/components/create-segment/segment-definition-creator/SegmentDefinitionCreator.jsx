import React, { useState, useEffect, useContext } from "react";
import { getWaterFallCounts } from "../../../utilities/createSegmentOperations";
import WhereAttribute from "./WhereAttribute";
import { FilterContext } from "../../../context/FilterContext";
import { CircularProgress, Grid, List, Typography } from "@material-ui/core";
import SyncIcon from "@material-ui/icons/Sync";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { thousandsSeperator } from "../../../utilities/processSegmentStats";
import { useDrop } from "react-dnd";

const useStyles = makeStyles(() => ({
  reloadIcon: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  reloadIconSpin: {
    animation: "spin 2s linear infinite",
  },
  "@keyframes spin": {
    "100%": {
      "-webkit-transform": "rotate(360deg)",
      transform: "rotate(360deg)",
    },
  },
  flashAttribute: {
    "&:last-child": {
      animation: "$flash 0.7s linear",
    },
  },
  normalDrop: {
    background: "#f5eacb",
  },
  "@keyframes flash": {
    "0%, 50%, 100%": {
      opacity: 1,
    },
    "25%, 75% ": {
      background: "#f7eeed",
      opacity: 0,
    },
  },
}));

const SegmentDefinitionCreator = ({ reloadRightPanel, fetchingSegment }) => {
  const classes = useStyles();
  // get selectedClauses to render and dropdown operators
  const {
    selectedClauses,
    setOperators,
    loadCities,
    loadStates,
    loadZips,
    filterCounts,
    totalCount,
    setFilterCounts,
    setTotalCount,
    addAttribute,
  } = useContext(FilterContext);
  // Holds the filtered counts shown in DOM
  // const [filterCounts, setFilterCounts] = useState([]);
  // Holds the total count shown in DOM
  // const [totalCount, setTotalCount] = useState(null);
  // Used to animate sync icon when fetching waterfall counts
  const [waterfallReloadOn, setWaterfallReloadOn] = useState(false);
  // Only true in first case. After first successful fetch of total counts, this remains false
  const [isTotalCountDirty, setTotalCountDirty] = useState(true);
  // For all indexes after this, the filtered counts will get updated
  const [updatedIndex, setUpdatedIndex] = useState(-1);

  useEffect(() => {
    setOperators();
    loadCities();
    loadStates();
    loadZips();
  }, []);

  const [dropped, setDropped] = useState(false);
  const handleDrop = (item) => {
    const dropZone = document.getElementById("dropzone");
    setDropped(true);
    setTimeout(() => {
      dropZone.scrollTop = dropZone.scrollHeight;
    }, 60);
    setTimeout(() => {
      setDropped(false);
    }, 1000);
    item ? addAttribute(item.data) : addAttribute();
  };

  const [{ isOver, didDrop }, drop] = useDrop({
    accept: "list",
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      didDrop: !!monitor.didDrop(),
    }),
  });

  /**
   * Set the updatedIndex. All filtered counts after this index will be reloaded when refresh button is clicked.
   * All the previous will be ignored as they won't change
   * @param {number(int)} currentIndex - The curent index that was updated
   */
  const setUpdatedIndexHandler = (currentIndex) => {
    setUpdatedIndex(Math.min(currentIndex, updatedIndex));
  };

  useEffect(() => {
    if (!fetchingSegment) reloadWaterfallCounts();
  }, [fetchingSegment]);

  /**
   * Helper method that gets waterfall counts
   */
  const reloadWaterfallCounts = () => {
    reloadRightPanel({
      SegmentTitle: "",
      SegDesc: "",
      AddTags: "",
      whereClause: selectedClauses.map(
        (selectedClause) => selectedClause.whereClause
      ),
    });
    const allCounts = []; // Array to hold all the filtered count promises
    setWaterfallReloadOn(true);
    if (isTotalCountDirty) {
      allCounts.push(totalCounts);
      const totalCounts = getWaterFallCounts(
        { SegmentTitle: "", SegDesc: "", AddTags: "" },
        [],
        0
      );
      totalCounts
        .then((response) => {
          setTotalCount(response.data["custCount"]);
          setTotalCountDirty(false);
        })
        .catch(console.error);
    }
    // spread new counts into a new array so set state can trigger re-render
    const newCounts = [...filterCounts];

    for (let i = 0; i < selectedClauses.length; i++) {
      // Skip all the where clauses before updatedIndex.
      // They are not stale and not to be updated
      if (i < updatedIndex) {
        continue;
      }
      const whereClauses = [];
      selectedClauses.slice(0, i + 1).forEach((selectedClause) => {
        whereClauses.push(selectedClause.whereClause);
      });
      const currentFilteredCount = getWaterFallCounts(
        { SegmentTitle: "", SegDesc: "", AddTags: "" },
        whereClauses,
        i + 1
      );
      currentFilteredCount
        .then((res) => {
          newCounts[i] = res.data["custCount"];
        })
        .catch(console.error);
      allCounts.push(currentFilteredCount);
    }
    // After all the filtered counts are received, the following callback will run.
    // This will se updated index, filtered counts and stop animations of reload icon.
    Promise.allSettled(allCounts).then(() => {
      setWaterfallReloadOn(false);
      setUpdatedIndex(selectedClauses.length);
      setFilterCounts(newCounts);
    });
  };

  if (fetchingSegment) {
    return (
      <div style={{ display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <React.Fragment>
      <Grid container justify="flex-end">
        <SyncIcon
          className={clsx(
            "mr-auto",
            classes.reloadIcon,
            waterfallReloadOn && classes.reloadIconSpin
          )}
          onClick={reloadWaterfallCounts}
        />
      </Grid>
      {/* Total counts */}
      {
        <Typography align="right" fontWeight={500}>
          {selectedClauses.length > 0 && (
            <div style={{ float: "left" }}>Drop an attribute below &darr;</div>
          )}
          Total Count:{" "}
          <b>{totalCount ? thousandsSeperator(totalCount) : "-"}</b>
        </Typography>
      }

      <List
        id="dropzone"
        ref={drop}
        style={{ height: "70vh", overflow: "auto", overflowX: "hidden" }}
      >
        {selectedClauses.length <= 0 && (
          <div
            style={{
              display: "grid",
              placeItems: "center",
              padding: "2rem 0.5rem",
              border: "2px grey dotted ",
            }}
          >
            <h2>Drop an attribute here from left panel.</h2>
          </div>
        )}

        {selectedClauses.map((selectedClause, index) => (
          <div className={dropped ? classes.flashAttribute : ""} key={uuidv4()}>
            {/* <div>{JSON.stringify(selectedClause)}</div> */}
            <WhereAttribute
              criteria={selectedClause.attribute}
              index={index + 1}
              // Callback so that updated index can be be updated
              setUpdatedIndex={setUpdatedIndexHandler}
              // Callback so filtered counts can be cleared and shown as "-" when where clause changes
              clearFilterCount={(index) => {
                const secondHalfArray = filterCounts
                  .slice(index + 1)
                  .map(() => undefined);

                setFilterCounts([
                  ...filterCounts.slice(0, index),
                  undefined,
                  ...secondHalfArray,
                ]);
              }}
            />

            {/* Filter counts for each stage */}
            {
              <Typography align="right" fontWeight={500}>
                Filter Count:{" "}
                <b>
                  {typeof filterCounts[index] === "undefined"
                    ? "-"
                    : thousandsSeperator(filterCounts[index])}
                </b>
              </Typography>
            }
          </div>
        ))}
      </List>
    </React.Fragment>
  );
};

export default SegmentDefinitionCreator;
