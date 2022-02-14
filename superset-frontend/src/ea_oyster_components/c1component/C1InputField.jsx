import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(({ palette, ...theme }) => ({
  root: {
    "& .Mui-error": {
      color: "red",
    },
    "& .MuiFormHelperText-root": {
      color: "red",
    },
  },
}));

const C1InputField = ({
  label,
  name,
  onChange,
  value,
  disabled,
  required,
  type,
  multiline,
  helperText,
  select,
  children,
  onBlur,
}) => {
  const classes = useStyles();
  return (
    <TextField
      margin="normal"
      label={label}
      name={name}
      type={type || "input"}
      fullWidth
      multiline={multiline || false}
      size="small"
      variant="outlined"
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      InputLabelProps={{
        shrink: true,
        disabled: disabled,
        required: required,
      }}
      helperText={helperText || ""}
      select={select ? true : false}
      className={classes.root}
      disabled={disabled}
    >
      {children}
    </TextField>
  );
};

C1InputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  multiline: PropTypes.bool,
  helperText: PropTypes.string,
};

export default C1InputField;
