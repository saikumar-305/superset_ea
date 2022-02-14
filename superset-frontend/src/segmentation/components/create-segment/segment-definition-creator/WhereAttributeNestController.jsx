import React, { useContext } from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { updateWhereClause } from "../../../utilities/createSegmentOperations";
import { FilterContext } from "../../../context/FilterContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  panelArrow: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const WhereAttributeNestController = ({ index, modifyContext }) => {
  const classes = useStyles();
  const { selectedClauses } = useContext(FilterContext);

  const computeAndOrIndex = (diff) => {
    const currentIndex = parseInt(
      selectedClauses[index - 1].whereClause["ANDOR_LR_INDEX"]
    );
    if (diff > 0) {
      // By default when moving right, don't move the AND/OR
      return currentIndex;
    }
    // Prevent out of range for AND/OR
    if (currentIndex + diff < 0 || currentIndex + diff > 2) {
      return currentIndex;
    } else {
      return currentIndex + diff; // Move the AND/OR with pannel(relative)
    }
  };

  const setIndex = (diff) => {
    const currentIndex = parseInt(
      selectedClauses[index - 1].whereClause["PANNEL_LR_INDEX"]
    );
    if (
      (currentIndex === 0 && diff < 0) || // Min index = 0
      (currentIndex === 2 && diff > 0) // Max index = 2
    ) {
      return;
    }
    const updatedAttributes = {};
    updatedAttributes["PANNEL_LR_INDEX"] = (currentIndex + diff).toString();
    updatedAttributes["ANDOR_LR_INDEX"] = computeAndOrIndex(diff).toString();
    // Update and modify context
    const newClause = updateWhereClause(
      selectedClauses[index - 1].whereClause,
      updatedAttributes
    );
    modifyContext(newClause);
  };

  return (
    <React.Fragment>
      <div>
        <ArrowBackIcon
          onClick={() => setIndex(-1)}
          className={classes.panelArrow}
        />
        <ArrowForwardIcon
          onClick={() => setIndex(1)}
          className={classes.panelArrow}
        />
      </div>
    </React.Fragment>
  );
};

export default WhereAttributeNestController;
