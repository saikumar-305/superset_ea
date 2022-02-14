import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { TextField, MenuItem } from "@material-ui/core";

export default function C1DropDownList({
  label,
  name,
  onChange,
  className,
  additionalProps,
  viewType,
  dropDownList,
  required,
  value, //optional, if given preselects that value
}) {
  const [selectedOption, setOption] = useState("");

  const handleChange = (event) => {
    setOption(event.target.value);
    onChange(event.target.value);
  };

  useEffect(() => {
    if (value) setOption(value);
  }, [value]);

  return (
    <TextField
      fullWidth
      variant="outlined"
      className={className ? className : "min-w-188"}
      label={label}
      disabled={viewType != "edit" ? true : false}
      name={name}
      size="small"
      margin="normal"
      value={selectedOption}
      onChange={handleChange}
      select
      {...additionalProps}
      required={required}
      InputLabelProps={{
        shrink: true,
        disabled: viewType != "edit" ? true : false,
        required: required,
      }}
    >
      {dropDownList.map((item) => (
        <MenuItem value={item.value} key={item.value}>
          {item.description}
        </MenuItem>
      ))}
    </TextField>
  );
}

C1DropDownList.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};
