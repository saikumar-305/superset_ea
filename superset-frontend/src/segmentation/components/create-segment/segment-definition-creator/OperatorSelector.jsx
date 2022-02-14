import React, { useState, useContext } from "react";
import { InputLabel, FormControl, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FilterContext } from "app/views/segmentation/context/FilterContext";

const useStyles = makeStyles(() => ({
  operatorSelect: {
    width: "100px",
    margin: "10px",
  },
}));

const OperatorSelector = ({ label, attributeName, updateOperator, value }) => {
  // get all operators for all attributes from context
  const { operators: allOperators } = useContext(FilterContext);
  const operators = allOperators[attributeName];
  // show first operator as default
  const getFirstSelected = () => (operators?.length ? operators[0]["ID"] : "");
  const initalValue = value === "" ? getFirstSelected() : value;
  const [operatorSelection, setOperatorSelection] = useState({
    operator: initalValue,
  });
  const classes = useStyles();
  return (
    Array.isArray(operators)?
    <FormControl className={classes.operatorSelect}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={operatorSelection.operator}
        onChange={(event) => {
          setOperatorSelection({
            operator: event.target.value,
          });
          const operator = operators.find((operator) => {
            return operator["ID"] && operator["ID"] === event.target.value;
          });
          updateOperator(event.target.value, operator["NAME"]);
        }}
      >
        {operators?.map((operator) => {
          return (
            <MenuItem value={operator["ID"]} key={operator["ID"]}>
              {operator["NAME"]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>:<></>
  );
};

export default OperatorSelector;
