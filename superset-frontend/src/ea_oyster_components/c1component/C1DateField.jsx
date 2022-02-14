import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

/*********************
 * Nov 5, 21
 * Sanjay: New feature to allow keyboard entry with display of date
 * 
 ********************/

const C1DateField = ({
  label,
  name,
  onChange,
  value,
  disabled,
  required,
  format,
  minDate,
  maxDate,
}) => {

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        inputVariant="outlined"
        size="small"
        format={format ? format : "dd/MM/yyyy"}
        margin="normal"
        label={label}
        fullWidth
        value={value || new Date()}
        name={name}
        autoOk
        minDate={minDate}
        maxDate={maxDate}
        variant="inline"
        onChange={(date) => onChange(name, date)}
        required={required}
        disabled={disabled}
      />
    </MuiPickersUtilsProvider>
  );
};

C1DateField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  multiline: PropTypes.bool,
  helperText: PropTypes.string,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
};

export default C1DateField;
