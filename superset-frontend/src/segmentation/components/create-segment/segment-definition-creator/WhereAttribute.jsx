import React, { useState, useContext, useEffect } from "react";
import { Paper } from "@material-ui/core";
import OperatorSelector from "./OperatorSelector";
import Suffix from "./Suffix";
import ValueInput from "./ValueInput";
import { updateWhereClause } from "../../../utilities/createSegmentOperations";
import {
  showSuffix,
  getOperatorNameFromId,
} from "../../../utilities/segmentDefinitionUtils";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { FilterContext } from "../../../context/FilterContext";
import { makeStyles } from "@material-ui/core/styles";
import MultiSelectValues from "./MultiSelectValues";
import AndOrSwitch from "./AndOrSwitch";
import WhereAttributeNestController from "./WhereAttributeNestController";
import {
  panelMarginCalculator,
  AndOrLevelCalculator,
} from "./component-utils/whereAttributeUtils";
import clsx from "clsx";
import whereAttributeStyles from "./component-utils/whereAttributeStyles";
import { isWithinSelected } from "../../../utilities/segmentationUtils";

const useStyles = makeStyles(() => whereAttributeStyles);

const WhereAttribute = ({
  criteria,
  index,
  setUpdatedIndex,
  clearFilterCount,
}) => {
  const classes = useStyles();
  const {
    selectedClauses,
    modifyAttribute,
    removeAttribute,
    operators: allOperators,
  } = useContext(FilterContext);
  const [currentClause, setCurrentClause] = useState(getCurrentClause());
  const label = Object.keys(criteria)[0];
  // eslint-disable-next-line no-unused-vars
  const [operator, setOperator] = useState("");
  const [betweenOperator, setBetweenOperator] = useState(false);
  const [showValue1, setShowValue1] = useState(true);
  const [withinOp, setWithinOp] = useState(
    isWithinSelected(getCurrentClause(), allOperators, label)
  );

  useEffect(() => {
    const operatorName = getOperatorNameFromId(
      currentClause["operator"],
      label,
      allOperators
    );
    showValues(operatorName);
  }, []);

  // Callback when multiSelect input selection changes
  const onMultiSelectChange = (selectedObjects) => {
    if (selectedObjects===undefined)
      return; //todo: check if really needed now
    const selectedIds = selectedObjects.map((el) => el["ID"]);
    updateWhereKV("VALUE1", selectedIds.toString());
  };

  /*
    SanjayL Eliminated as doesn't support typinh as well as 
    this way does not retain focus when typing. There
    should be no wrapper function.
  
    const [, Value1MultiSelect] = useMultiSelect(
    "Select",
    getCurrentClause()["VALUE1"],
    criteria[label],
    onMultiSelectChange,
    label !== "COUNTRY"
  );*/

  /**
   * Sets new where clause object at index - 1
   * @param {any} newWhereClause - New where clause object
   */
  function modifyContext(newWhereClause) {
    modifyAttribute(newWhereClause, index - 1);
    setCurrentClause(getCurrentClause());
    setUpdatedIndex(index - 1);
  }

  /**
   * Gets current where clause object
   * @returns where clause
   */
  function getCurrentClause() {
    return selectedClauses[index - 1].whereClause;
  }

  /**
   * Updates a key current where clause and sets context.
   * @param {string} key  - Key of the attribute to modfy in where clause
   * @param {any} newValue - Updated value in the object
   * @returns - New where clause with the update
   */
  const updateWhereKV = (key, newValue) => {
    const newClause = updateWhereClause(getCurrentClause(), {
      [key]: newValue,
    });
    modifyContext(newClause);
    return newClause;
  };

  /**
   * Callback to update the operator selected by the user in the where clause
   * @param {string} newValue - new operator value to be set in where clause
   * @param {string} operatorName - String value of the operator used to re-render UI if required. Eg - `NULL` will not show any <ValueInput /> whereas between will show two.
   */
  const updateOperator = (newValue, operatorName) => {
    newValue = newValue.toString();
    setOperator(newValue);
    const newWhere = updateWhereClause(getCurrentClause(), {
      operator: newValue,
      OPERATOR_ID: newValue,
    });
    modifyContext(newWhere);
    showValues(operatorName);
  };

  /**
   * Logic to change <ValueInput /> based on the operator selected.
   * @param {string} operatorName - Operator name. Eg: `NULL`, `NOT NULL`, `BETWEEN`, `IS`
   */
  const showValues = (operatorName) => {
    setBetweenOperator(showSecondValue(operatorName));
    setShowValue1(showFirstValue(operatorName));
    setWithinOp(withinSelected(operatorName));
  };

  const showSecondValue = (operatorName) =>
    operatorName === "BETWEEN" || operatorName === "NOT BETWEEN";

  const showFirstValue = (operatorName) =>
    !(operatorName === "IS NULL" || operatorName === "IS NOT NULL");

  const withinSelected = (operatorName) =>
    operatorName === "WITHIN" || operatorName === "NOT WITHIN";

  return (
    <React.Fragment>
      {index > 1 && (
        <AndOrSwitch
          index={index}
          modifyContext={modifyContext}
          level={AndOrLevelCalculator(selectedClauses, index - 1)}
        />
      )}
      <div
        style={{
          marginLeft: panelMarginCalculator(selectedClauses, index - 1),
        }}
      >
        <Paper
          elevation={6}
          className={clsx([
            selectedClauses[index - 1].whereClause["PANNEL_LR_INDEX"] === "1" &&
              classes.level1Paper,
            selectedClauses[index - 1].whereClause["PANNEL_LR_INDEX"] === "2" &&
              classes.level2Paper,
          ])}
        >
          <div className={classes.whereFlex}>
            {index > 1 && (
              <WhereAttributeNestController
                index={index}
                modifyContext={modifyContext}
              />
            )}
            {label && (
              <div className={classes.whereLabel}>
                <label>{label}</label>
              </div>
            )}
            {showSuffix(criteria[label]) && (
              <Suffix
                options={criteria[label]}
                updateSuffix={(value) => {
                  updateWhereKV("SUFFIX", value);
                }}
                value={currentClause["SUFFIX"]}
              />
            )}
            <OperatorSelector
              label="Select"
              attributeName={label}
              updateOperator={updateOperator}
              value={currentClause["operator"]}
            />
            {showValue1 &&
              Array.isArray(criteria[label]) &&
              criteria[label]["length"] &&
              criteria[label][0].TYPE !== "_STRING" &&
              (criteria[label].length === 1 ||
                (criteria[label].length > 1 &&
                  showSuffix(criteria[label]))) && (
                <ValueInput
                  placeholder={withinOp ? "DAYS" : criteria[label][0].TYPE}
                  onChange={(value) => {
                    updateWhereKV("VALUE1", value);
                  }}
                  value={currentClause["VALUE1"]}
                />
              )}
            {showValue1 &&
              Array.isArray(criteria[label]) &&
              criteria[label]["length"] &&
              criteria[label].length > 1 &&
              !showSuffix(criteria[label]) && (
                <MultiSelectValues
                  label={"Select"}
                  defaultState={getCurrentClause()["VALUE1"]}
                  options={criteria[label]}
                  onChangeUpdate={onMultiSelectChange}
                />
              )}

            {betweenOperator && (
              <ValueInput
                placeholder={criteria[label][0].TYPE}
                onChange={(value) => {
                  updateWhereKV("VALUE2", value);
                }}
                value={currentClause["VALUE2"]}
              />
            )}
            <RemoveCircleIcon
              onClick={() => {
                removeAttribute(index); // Remove from context
                setUpdatedIndex(index - 1); // update index
                clearFilterCount(index - 1); // Clear filter counts below it
              }}
              className={classes.removeIcon}
            />
          </div>
        </Paper>
      </div>
    </React.Fragment>
  );
};

export default WhereAttribute;
