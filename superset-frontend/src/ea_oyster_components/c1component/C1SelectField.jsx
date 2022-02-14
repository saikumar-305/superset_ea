import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import C1InputField from "./C1InputField";

const C1SelectField = ({
  label,
  name,
  onChange,
  value,
  disabled,
  required,
  options,
  helperText,
}) => {
  return (
    <C1InputField
      label={label}
      name={name}
      disabled={disabled}
      required={required}
      value={value}
      onChange={onChange}
      select
      helperText={helperText}
    >
      <MenuItem value="" key="">
        {" "}
      </MenuItem>
      {options}
    </C1InputField>
  );
};

C1SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  options: PropTypes.node.isRequired,
  helperText: PropTypes.string,
};

export default C1SelectField;
