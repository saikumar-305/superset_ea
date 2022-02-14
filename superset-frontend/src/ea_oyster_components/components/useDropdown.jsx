// This is a custom hooks for the dropDown using material UI.
// Set default state and pass a onChange function to change the selection.

import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useDropdown = (label, defaultState, options, required = false) => {
  const [state, setState] = useState(defaultState);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;
  const labelId = `use-dropdown-label-${label.replace(" ", "").toLowerCase()}`;
  const Dropdown = () => (
    <FormControl style={{ minWidth: "5rem", maxWidth: "10rem" }}>
      <InputLabel id={labelId} required={required}>
        {label}
      </InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={state}
        onChange={(e) => setState(e.target.value)}
        onBlur={(e) => setState(e.target.value)}
      >
        {options.map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
  return [state, Dropdown, setState];
};

export default useDropdown;
