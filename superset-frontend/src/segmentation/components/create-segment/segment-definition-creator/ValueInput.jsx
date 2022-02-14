import React, { useEffect } from "react";
import { TextField } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { parseDate, dateFormatter } from "../../../utilities/segmentationUtils";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  dateSelector: {
    width: "150px",
    margin: "10px",
  },
}));

/**
 * Used by {@link WhereAttribute}
 * JSX component for input values. Changes to text, number, date input.
 * Usage:
  <pre><code>
  <ValueInput
    placeholder={criteria[label][0].TYPE}
    onChange={(value) => {
    updateWhereKV("VALUE2", value);
    }}
    value={currentClause["VALUE2"]}
    />
  </code></pre>
 * @param {string} placeholder - Placeholer shown in input field. This is used for deciding which type of field to show(`text`, `number`, `date`)
 * @param {string} value - value to show in to the user
 * @param {func} onChange - callback to call after the input changes
 * @component
 * @category Segment
 * @subcategory Create
 */
const ValueInput = ({ placeholder, value, onChange }) => {
  const classes = useStyles();
  let type = "text";
  // Days is required for within
  if (placeholder === "NUMBER" || placeholder === "DAYS") {
    type = "number";
  } else if (placeholder === "DATE") {
    type = "date";
  }

  useEffect(() => {
    if (type === "date") {
      const parsedDate = parseDate(value);
      if (parsedDate) onChange(dateFormatter(parsedDate));
      else onChange(dateFormatter(new Date()));
    } else if (!value && type === "number") {
      onChange("");
    }
  }, [placeholder]);

  /**
   * Utility to convert string to date object converter.
   * @param {string} date
   * @returns {Date}
   */
  const dateParser = (date) => {
    const parsedDate = parseDate(date);
    if (!parsedDate) {
      return new Date();
    } else {
      return parsedDate;
    }
  };

  return (
    <React.Fragment>
      {(type === "text" || type === "number") && (
        <TextField
          label={placeholder}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
        />
      )}
      {type === "date" && (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={classes.dateSelector}
            margin="normal"
            id={uuidv4()}
            label="Date"
            format="dd-MMM-yyyy"
            value={dateParser(value)}
            onChange={(e) => {
              onChange(dateFormatter(e));
            }}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      )}
    </React.Fragment>
  );
};

export default ValueInput;
