// This is a custom hooks for the Radio Group using material UI.

import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

const useRadioGroup = (
  label,
  defaultState,
  options,
  handleChange,
  required = false
) => {
  const [state, setState] = useState(defaultState);
  const RadioGrp = () => (
    <FormControl component="fieldset">
      <FormLabel component="legend" required={required}>
        {label}
      </FormLabel>
      <RadioGroup
        aria-label={label}
        value={state}
        onChange={(e) => {
          setState(e.target.value);
          handleChange(e.target.value);
        }}
        row
      >
        {options.map((option) => (
          <FormControlLabel
            value={option}
            control={<Radio color="primary" />}
            label={option}
            key={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
  return [state, RadioGrp, setState];
};

export default useRadioGroup;
