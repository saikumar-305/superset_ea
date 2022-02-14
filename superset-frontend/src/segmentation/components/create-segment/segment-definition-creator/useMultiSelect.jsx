import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Select,
  Chip,
  MenuItem,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    maxWidth: 250,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}));

/**
 * Custom hook for multi select dropdown
 */
const useMultiSelect = (
  label,
  defaultState,
  options,
  onChangeUpdate,
  multiSelect = true
) => {
  function getStyles(id, state, theme) {
    const found = state.find((el) => el["ID"] === id);
    return {
      fontWeight: found
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    };
  }

  const classes = useStyles();

  const getDefaultState = () => {
    let defaultArray = [];
    if (defaultState) {
      defaultArray = options.filter((el) => defaultState.includes(el["ID"]));
      return defaultArray;
    }
    return defaultArray;
  };

  const [state, setState] = useState(getDefaultState());
  const theme = useTheme();
  const id = uuidv4();

  const handleChange = (event) => {
    if (!multiSelect) {
      setState([event.target.value]);
      onChangeUpdate([event.target.value]);
    } else {
      setState(event.target.value);
      onChangeUpdate(event.target.value);
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const MultiSelect = () => (
    <FormControl className={classes.formControl}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        id={`select-${id}`}
        multiple={multiSelect}
        value={state}
        onChange={handleChange}
        onBlur={handleChange}
        input={<Input id={`select-multiple-${id}`} />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected?.map((object) => (
              <Chip
                key={uuidv4()}
                label={object["NAME"]}
                className={classes.chip}
              />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {options?.map((option) => (
          <MenuItem
            key={uuidv4()}
            value={option}
            style={getStyles(option["ID"], state, theme)}
          >
            {option["NAME"]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return [state, MultiSelect, setState];
};

export default useMultiSelect;
