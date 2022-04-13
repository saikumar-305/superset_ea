import jwtAuthService from "../../services/jwtAuthService";
import FirebaseAuthService from "../../services/firebase/firebaseAuthService";
import { setUserData } from "./UserActions";
import history from "src/ea_oyster_components/history";
import axios from "src/ea_oyster_components/axios";
import apiPaths from "src/ea_oyster_components/constants/apiPaths";
import C1Popup from "src/ea_oyster_components/c1component/C1Popup";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const RESET_PASSWORD = "RESET_PASSWORD";

export const setAuthLoadingStatus = (status = false) => {
  return (dispatch) =>
    dispatch({
      type: LOGIN_LOADING,
      data: status,
    });
};

export function loginWithEmailAndPassword({ email, password }) {
  return (dispatch) => {
    return jwtAuthService
      .loginWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch(setUserData(user));

        return dispatch({
          type: LOGIN_SUCCESS,
        });
      })
      .catch((error) => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error,
        });
      });
  };
}

export function resetPassword({ email }) {
  let parameter = {};
  parameter.email = email;
  return function (dispatch) {
    axios
      .post(apiPaths.FORGOT_PASSWORD, btoa(JSON.stringify(parameter)))
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        console.log("completed");
        return dispatch({
          type: "RESET_PASSWORD",
          payload: email,
        });
      })
      .catch((err) => console.log(err));
  };
}

export function firebaseLoginEmailPassword({ email, password }) {
  return (dispatch) => {
    FirebaseAuthService.signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) {
          dispatch(
            setUserData({
              userId: "1",
              role: "ADMIN",
              displayName: "Watson Joyce",
              email: "watsonjoyce@gmail.com",
              photoURL: "/assets/images/face-7.jpg",
              age: 25,
              token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh",
              ...user,
            })
          );

          history.push({
            pathname: "/",
          });

          return dispatch({
            type: LOGIN_SUCCESS,
          });
        } else {
          return dispatch({
            type: LOGIN_ERROR,
            payload: "Login Failed",
          });
        }
      })
      .catch((error) => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error,
        });
      });
  };
}
