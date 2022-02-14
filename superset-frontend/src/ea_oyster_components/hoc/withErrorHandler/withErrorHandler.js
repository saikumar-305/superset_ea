import React, { Component } from "react";
import AuxDiv from "../AuxDiv/AuxDiv";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import classes from "./withErrorHandler.module.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const withErrorHandler = (WrappedComponent, axios) => {
  return class ErrHandler extends Component {
    state = {
      error: null,
      open: false,
    };

    handleOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    constructor(props) {
      super(props);
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null, open: false });
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error, open: true });
        }
      );
    }

    //This will remove the interceptors, cleaning up so that if we reuse this in other parts in the application
    //it will not create more interceptors
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <AuxDiv>
          <Snackbar
            open={this.state.open}
            onClose={this.handleClose}
            autoHideDuration={8000}
          >
            <Alert onClose={this.handleClose} severity="error">
              {this.state.error
                ? `${this.state.error.message} , Please try again later.`
                : "Unable to reach the URL"}
            </Alert>
          </Snackbar>
          <WrappedComponent {...this.props} />
        </AuxDiv>
      );
    }
  };
};

export default withErrorHandler;
