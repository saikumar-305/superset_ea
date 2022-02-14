import React from "react";
import { Breadcrumb } from "matx";
import { Divider, Card } from "@material-ui/core";

const C1DetailsPanel = (props) => {
  let body = props.children;
  if (props.isForm) {
    body = (
      <Card elevation={3}>
        {props.cardHeader ? <div className="flex p-4">
          <h4 className="m-0">{props.cardHeader}</h4>
        </div> : ""
        }
        {props.cardHeader ? <Divider className="mb-2" /> : ""}
        {props.children}
      </Card>
    );
  }

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb routeSegments={props.routeSegments} />
      </div>
      {body}
    </div>
  );
};

export default C1DetailsPanel;
