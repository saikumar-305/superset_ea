import React from "react";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

import PropTypes from "prop-types";
const C1Card = ({ headerLabel, icon, children }) => {
  return (
    <Card raised>
      <h5
        className="p-3 m-0"
        color="primary"
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {icon}
        {headerLabel}
      </h5>
      {headerLabel && <Divider />}
      <Paper className="p-3 m-0">{children}</Paper>
    </Card>
  );
};

C1Card.propTypes = {
  headerLabel: PropTypes.string,
  icon: PropTypes.element,
  children: PropTypes.element,
};

export default C1Card;
