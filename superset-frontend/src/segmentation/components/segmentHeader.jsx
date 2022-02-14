import React, { useContext, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import C1InputField from 'src/ea_oyster_components/c1component/C1InputField';
import PropTypes from 'prop-types';
import { FilterContext } from '../context/FilterContext';
import { useLocation } from 'react-router';

/**
 * Segment Header with title, description and tags fields
 */
const SegmentHeader = ({ segment, disabled, editMode }) => {
  let { segmentDetails, modifySegmentDetails } = useContext(FilterContext);
  const location = useLocation();

  if (disabled) {
    segmentDetails.SegmentTitle = segment['TITLE'];
    segmentDetails.AddTags = segment['TAG'];
    segmentDetails.SegDesc = segment['DESCRIPTION'];
  }
  const segmentTitleOnChange = e => {
    modifySegmentDetails(
      e.target.value.toUpperCase(),
      segmentDetails.SegDesc,
      segmentDetails.AddTags,
    );
  };
  const segmentDescOnChange = e => {
    modifySegmentDetails(
      segmentDetails.SegmentTitle,
      e.target.value.toUpperCase(),
      segmentDetails.AddTags,
    );
  };
  const segmentTagOnChange = e => {
    modifySegmentDetails(
      segmentDetails.SegmentTitle,
      segmentDetails.SegDesc,
      e.target.value.toUpperCase(),
    );
  };

  return (
    <Grid container spacing={3}>
      <Grid item md={4} xs={12}>
        <C1InputField
          onChange={segmentTitleOnChange}
          value={segmentDetails.SegmentTitle}
          name=""
          label="Segment Name"
          disabled={disabled}
        />
      </Grid>

      <Grid item md={4} xs={12}>
        <C1InputField
          onChange={segmentDescOnChange}
          value={segmentDetails.SegDesc}
          name=""
          label="Description"
          disabled={disabled}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <C1InputField
          onChange={segmentTagOnChange}
          value={segmentDetails.AddTags}
          name=""
          label="Tags"
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
};

SegmentHeader.propTypes = {
  segment: PropTypes.object,
  disabled: PropTypes.bool,
};

export default SegmentHeader;
