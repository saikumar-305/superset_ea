import React from "react";
import { Grid } from "@material-ui/core";
import { useStyles } from "app/c1component/C1Styles";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import SaveIcon from "@material-ui/icons/Save";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ExitIcon from "@material-ui/icons/ExitToApp";
import Link from "@material-ui/icons/Link";
import LinkOff from "@material-ui/icons/LinkOff";

const C1FormButtons = (props) => {
  const classes = useStyles();
  const history = useHistory();

  let submit = null;
  if (props.showSubmit) {
    submit = (
      <Tooltip title="Save">
        <IconButton aria-label="save" type="submit" color="primary">
          <SaveIcon />
        </IconButton>
      </Tooltip>
    );
  }

  let cancel = null;
  if (props.showCancel) {
    cancel = (
      <Tooltip title="Exit">
        <IconButton
          aria-label="exit"
          type="button"
          onClick={() => history.goBack()}
          color="secondary"
        >
          <ExitIcon />
        </IconButton>
      </Tooltip>
    );
  }

  let back = null;
  if (props.showBack) {
    back = (
      <Tooltip title="Exit">
        <IconButton
          aria-label="exit"
          type="button"
          onClick={() => history.goBack()}
          color="secondary"
        >
          <ExitIcon />
        </IconButton>
      </Tooltip>
    );
  }

  let approve = null;
  if (props.showApprove) {
    approve = (
      <Tooltip title="Approve">
        <IconButton aria-label="approve" type="submit" color="primary">
          <ThumbUp />
        </IconButton>
      </Tooltip>
    );
  }

  let reject = null;
  if (props.showReject) {
    reject = (
      <Tooltip title="Reject">
        <IconButton aria-label="reject" type="submit" color="primary">
          <ThumbDown />
        </IconButton>
      </Tooltip>
    );
  }

  let activate = null;
  if (props.showActivate) {
    activate = (
      <Tooltip title="Activate">
        <IconButton aria-label="activate" type="submit" color="primary">
          <Link />
        </IconButton>
      </Tooltip>
    );
  }

  let deactivate = null;
  if (props.showDeactivate) {
    deactivate = (
      <Tooltip title="Deactivate">
        <IconButton aria-label="deactivate" type="submit" color="primary">
          <LinkOff />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Grid container alignItems="center">
      <Grid item lg={12} md={12} xs={12}>
        <div>
          {submit}
          {approve}
          {reject}
          {activate}
          {deactivate}
          {cancel}
          {back}
        </div>
      </Grid>
    </Grid>
  );
};

export default C1FormButtons;
