import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import C1DateField from 'src/ea_oyster_components/c1component/C1DateField';
import PropTypes from 'prop-types';

//Nov 5, 21 Sanjay: Removed format from C1DateField as it has been fixed internally to allow
//keyboard usage too

/**
 * JSX component to select date ranges. Min and max dates can be given.
 */
const DateRangeSelector = ({ minDate, maxDate, onChangeHandler }) => {
  // Current user selected start date, end date
  const [startDate, setStartDate] = useState(minDate);
  const [endDate, setEndDate] = useState(maxDate);
  const [lastChanged, setLastChanged] = useState(null);

  useEffect(() => {
    if (
      lastChanged === 'startDate' &&
      startDate &&
      endDate &&
      startDate.valueOf() > endDate.valueOf()
    ) {
      setEndDate(startDate);
    } else if (
      lastChanged === 'endDate' &&
      startDate &&
      endDate &&
      startDate.valueOf() > endDate.valueOf()
    ) {
      setStartDate(endDate);
    }

    onChangeHandler(startDate, endDate);
  }, [startDate, endDate]);

  const onDatesChange = (name, newDate) => {
    name === 'startDate' ? setStartDate(newDate) : setEndDate(newDate);
    setLastChanged(name);
  };
  return (
    <Grid container spacing={2}>
      <Grid item md={6} sm={6}>
        <Typography component={'div'}>Start Date</Typography>
        <C1DateField
          name="startDate"
          value={startDate || new Date()}
          minDate={minDate}
          maxDate={maxDate}
          onChange={onDatesChange}
        />
      </Grid>
      <Grid item md={6} sm={6}>
        <Typography component={'div'}>End Date</Typography>
        <C1DateField
          name="endDate"
          value={endDate || new Date()}
          minDate={minDate}
          maxDate={maxDate}
          onChange={onDatesChange}
        />
      </Grid>
    </Grid>
  );
};

DateRangeSelector.propTypes = {
  minDate: PropTypes.instanceOf(Date).isRequired,
  maxDate: PropTypes.instanceOf(Date).isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};
export default DateRangeSelector;
