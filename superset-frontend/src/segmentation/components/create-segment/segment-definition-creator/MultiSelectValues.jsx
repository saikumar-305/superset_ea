import React, { useState } from "react";
import {
  TextField
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import Autocomplete, {
  createFilterOptions
} from "@material-ui/lab/Autocomplete";

// Contains custom logic for criteria searching by ID

const MultiSelectValues = (
  {label,
  defaultState,
  options,
  onChangeUpdate}
) => {
  const getDefaultState = () => {
    let defaultArray = [];
    if (defaultState) {      
      var items = defaultState.split(/\s*,\s*/);
      defaultArray = options.filter((el) => items.some(function(v) { return v === el["ID"]; }));
      return defaultArray;
    }
    return defaultArray;
  };

  const [state, setState] = useState(getDefaultState());
  const id = uuidv4();

  const handleChange = (event, values) => {
      setState(values);
      onChangeUpdate(values);
  };

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 100
  });
 
  return (
    <>
      {state && <Autocomplete
        id={`select-${id}`}
        multiple={true}
        getOptionSelected={(option, value) => option.ID === value.ID}
        openOnFocus={true}
        style={{
          width: 350
        }}
        options={options}
        filterOptions={filterOptions}
        autoHighlight={true}
        value={state}
        getOptionLabel={(e) => { if (e.NAME !== undefined) return e.NAME.toString(); else return ""}}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField id={`select-multiple-${id}`} {...params} 
          label={label}  
          />
        )}
      />}
    </>
  );
};

export default MultiSelectValues;
