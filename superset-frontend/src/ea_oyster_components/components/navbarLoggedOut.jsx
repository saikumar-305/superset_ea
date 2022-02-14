// Contains the top navbar with the oyster logo. This is only used in loggout out view.
// For loggin in topbar check the src/app/MatxLayout/Layout1/Layout1Topbar.jsx file.

import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

const navBarStyles = {
  navbarMain: {
    backgroundColor: "#fff",
  },
  logoStyle: {
    cursor: "pointer",
  },
};

const navBar = () => {
  return (
    <div className={clsx("col-md-12 padZ", navBarStyles.navbarMain)}>
      <Link to="/">
        <img
          src="/assets/images/oyster/oyster_logo.png"
          style={navBarStyles.logoStyle}
          alt="Oyster Logo"
        />
      </Link>
    </div>
  );
};

export default navBar;
