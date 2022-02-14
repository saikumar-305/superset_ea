import React, { useContext, useState, useEffect } from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { FilterContext } from "../../../context/FilterContext";
import { updateWhereClause } from "../../../utilities/createSegmentOperations";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  panelArrow: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  divFlex: {
    display: "flex",
    alignItems: "center",
  },
}));

/**
 * JSX component for AND or Switching. This component will update the context as well.
 * It recevies the index for the left margin from the parent.
 */
const AndOrSwitch = ({ index, modifyContext }) => {
  const { selectedClauses } = useContext(FilterContext);
  const [state, setState] = useState(getCurrentClause()["SWITCH"]);
  const classes = useStyles();

  useEffect(() => {
    const newClause = updateWhereClause(getCurrentClause(), {
      SWITCH: state,
    });
    modifyContext(newClause);
  }, [state]);

  function getCurrentClause() {
    return selectedClauses[index - 1].whereClause;
  }

  const setAndOrIndex = (diff) => {
    const finalLevel =
      parseInt(selectedClauses[index - 1].whereClause["ANDOR_LR_INDEX"]) + diff;
    if (finalLevel < 0 || finalLevel > 2) {
      return;
    }
    const panelIndex =
      selectedClauses[index - 1].whereClause["PANNEL_LR_INDEX"];
    if (finalLevel > panelIndex) {
      return;
    }
    const newClause = updateWhereClause(getCurrentClause(), {
      ANDOR_LR_INDEX: finalLevel.toString(),
    });
    modifyContext(newClause);
  };

  return (
    <React.Fragment>
      <div className={classes.divFlex}>
        <div
          style={{
            marginLeft:
              selectedClauses[index - 1].whereClause["ANDOR_LR_INDEX"] * 1 +
              "rem", // Convert level into left margin
          }}
        >
          <ButtonGroup disableElevation variant="contained">
            <Button
              color={state === "AND" ? "primary" : null}
              onClick={() => {
                setState("AND");
              }}
            >
              AND
            </Button>
            <Button
              color={state === "OR" ? "primary" : null}
              onClick={() => {
                setState("OR");
              }}
            >
              OR
            </Button>
          </ButtonGroup>
        </div>
        <div>
          <ArrowBackIcon
            onClick={() => setAndOrIndex(-1)}
            className={classes.panelArrow}
          />
          <ArrowForwardIcon
            onClick={() => setAndOrIndex(1)}
            className={classes.panelArrow}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AndOrSwitch;
