import React from 'react';
import { Breadcrumb } from '../matx/index';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';

const C1ListPanel = ({ routeSegments, showSelection, children }) => {
  let selectComponent = showSelection || null;

  return (
    <div className="m-sm-30">
      {routeSegments && (
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={routeSegments} />
        </div>
      )}
      <div className="overflow-auto">
        <div className="min-w-750">
          <Grid container spacing={0}>
            {selectComponent && (
              <Grid item xs={12} style={{ border: '0px solid red' }}>
                <Grid
                  container
                  item
                  direction="row"
                  justify="flex-end"
                  alignItems="flex-end"
                >
                  <Grid item xs={6}>
                    {selectComponent}
                  </Grid>
                </Grid>
              </Grid>
            )}
            {selectComponent && (
              <Grid item xs={12}>
                <Divider />
              </Grid>
            )}
            <Grid item xs={12}>
              {children}
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

C1ListPanel.propTypes = {
  showSelection: PropTypes.element,
  routeSegments: PropTypes.array,
  children: PropTypes.element,
};

export default C1ListPanel;
