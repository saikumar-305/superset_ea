import React from "react";
import moment from "moment";
import { Grid, TextField, Fade } from "@material-ui/core";
import { C1FormContext } from "app/c1component/C1FormContext";

import { useStyles } from "./C1Styles";
import PropTypes from "prop-types";

const C1PropertiesTab = ({ dtCreated, usrCreated, dtLupd, usrLupd }) => {
  const classes = useStyles();

  return (
    <C1FormContext.Consumer>
      {(data) => {
        const _data = data.data;
        return (
          <Grid container spacing={3} className={classes.gridContainer}>
            <Grid item xs={3} lg={3} md={2} sm={2}>
              <TextField
                label="Date Created"
                fullWidth
                margin="normal"
                value={moment(_data[dtCreated]).format("YYYY-MM-DD hh:mm:ss")}
                variant="outlined"
                size="small"
                InputProps={{
                  disabled: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3} lg={3} md={2} sm={2}>
              <TextField
                label="User Created"
                fullWidth
                margin="normal"
                value={_data[usrCreated]}
                variant="outlined"
                size="small"
                InputProps={{
                  disabled: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3} lg={3} md={2} sm={2}>
              <TextField
                label="Date Last Updated"
                fullWidth
                margin="normal"
                value={moment(_data[dtLupd]).format("YYYY-MM-DD hh:mm:ss")}
                variant="outlined"
                size="small"
                InputProps={{
                  disabled: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3} lg={3} md={2} sm={2}>
              <TextField
                label="User Last Updated"
                fullWidth
                margin="normal"
                size="small"
                value={_data[usrLupd]}
                variant="outlined"
                InputProps={{
                  disabled: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        );
      }}
    </C1FormContext.Consumer>
  );
};

C1PropertiesTab.propTypes = {
  dtCreated: PropTypes.any,
  usrCreated: PropTypes.string,
  dtLupd: PropTypes.any,
  usrLupd: PropTypes.string,
};
export default C1PropertiesTab;
