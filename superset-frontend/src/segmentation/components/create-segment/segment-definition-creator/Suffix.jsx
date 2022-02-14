import React, { useState, useEffect } from "react";
import { InputLabel, FormControl, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles(() => ({
  suffixSelect: {
    width: "100px",
    margin: "10px",
  },
}));

/**
 * JSX component for suffix selection
 */
const Suffix = ({ options, updateSuffix, value }) => {
  const classes = useStyles();
  const getFirstSelected = () => (options.length ? options[0]["SUFFIX"] : "");
  const initalValue = value === "" ? getFirstSelected() : value;
  const [suffixSelection, setSuffixSelection] = useState(initalValue);

  useEffect(() => {
    if (value != suffixSelection) {
      updateSuffix(suffixSelection);
    }
    return () => {
      // cleanup;
    };
  }, [suffixSelection, updateSuffix]);

  return (
    <FormControl>
      <InputLabel>Suffix</InputLabel>
      <Select
        value={suffixSelection}
        onChange={(event) => {
          setSuffixSelection(event.target.value);
        }}
        className={classes.suffixSelect}
      >
        {options.map((option) => {
          return (
            <MenuItem value={option["SUFFIX"]} key={uuidv4()}>
              {option["SUFFIX"]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default Suffix;
