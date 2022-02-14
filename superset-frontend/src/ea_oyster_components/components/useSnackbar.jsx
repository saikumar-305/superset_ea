import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

/************************
 * Nov 5, 21 
 * Sanjay:New features: defaultAnchor option that can be used either with 
 * useSnakbar or with the returned openSnackBar function.
 * 
 * 
 ************************/

const useSnackbar = (defaultMessage, defaultSeverity, defaultAnchor) => {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [isActive, setIsActive] = React.useState(false);
  const [message, setMessage] = React.useState(defaultMessage);
  const [severity, setSeverity] = React.useState(defaultSeverity);
  const [anchor, setAnchor] = React.useState(defaultAnchor);

  const openSnackBar = (msg, severity, anAnchorOrigin) => {
    if (msg) {
      setMessage(msg);
    }
    if (severity) {
      setSeverity(severity);
    }
    if (anAnchorOrigin) setAnchor(anAnchorOrigin);
    setIsActive(true);
  };

  const handleClose = () => {
    setIsActive(false);
  };

  const SnackBar = () => (
    <>
      <Snackbar
        open={isActive}
        autoHideDuration={8000}
        onClose={handleClose}
        {...(anchor && { anchorOrigin: { ...anchor } })}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );

  return [SnackBar, openSnackBar];
};

export default useSnackbar;
