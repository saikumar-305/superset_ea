import React from "react";
import { Icon, IconButton, Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";

const C1DataTableActions = (props) => {
  const param = props.params;
  return (
    <div className="flex items-center">
      <div className="flex-grow"></div>
      {param.approve && param.approve.show && (
        <Link to={param.approve.path}>
          <Tooltip title="Approve">
            <IconButton>
              <Icon>thumb_up</Icon>
            </IconButton>
          </Tooltip>
        </Link>
      )}

      {param.reject && param.reject.show && (
        <Link to={param.reject.path}>
          <Tooltip title="Reject">
            <IconButton>
              <Icon>thumb_down</Icon>
            </IconButton>
          </Tooltip>
        </Link>
      )}

      {param.edit && param.edit.show && (
        <Link to={param.edit.path}>
          <Tooltip title="Edit">
            <IconButton>
              <Icon>edit</Icon>
            </IconButton>
          </Tooltip>
        </Link>
      )}

      {param.copy && param.copy.show && (
        <Link to={param.copy.show}>
          <Tooltip title="Duplicate">
            <IconButton>
              <Icon>file_copy</Icon>
            </IconButton>
          </Tooltip>
        </Link>
      )}

      {param.deactivate && param.deactivate.show && (
        <Link to={param.deactivate.path}>
          <Tooltip title="Deactivate">
            <IconButton>
              <Icon>link_off</Icon>
            </IconButton>
          </Tooltip>
        </Link>
      )}

      {param.activate && param.activate.show && (
        <Link to={param.activate.path}>
          <Tooltip title="Activate">
            <IconButton>
              <Icon>link</Icon>
            </IconButton>
          </Tooltip>
        </Link>
      )}

      {param.view && param.view.show && (
        <Link to={param.view.path}>
          <Tooltip title="View">
            <IconButton>
              <Icon>visibility</Icon>
            </IconButton>
          </Tooltip>
        </Link>
      )}
    </div>
  );
};

export default C1DataTableActions;
