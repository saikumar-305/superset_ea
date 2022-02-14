import React, { createContext, useEffect, useReducer } from "react";
import jwtDecode from "jwt-decode";
import axios from "src/ea_oyster_components/axios.js";
import { CircularProgress } from "@material-ui/core";
import localStorageService from "../services/localStorageService";
import apiConstants from "../constants/apiPaths";

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decodedToken = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

const setSession = (accessToken, refreshToken = null) => {
  localStorageService.setToken({ jwt: accessToken, refreshToken });
};

const clearSession = () => {
  localStorageService.clearToken();
};

const getUserDetails = () => axios.get(apiConstants.USER_DETAILS);

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case "LOGIN": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case "REGISTER": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => Promise.resolve(),
  logout: () => { },
  register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password, rememberMe) => {
    try {
      let request = {
        username: email,
        password,
        rememberMe,
      };
      let response = undefined;
      response = await axios.post(
        apiConstants.LOGIN_TOKEN,
        btoa(JSON.stringify(request))
      );
      const accessToken = response.data.jwt;
      const refreshToken = response.data.refreshToken;

      setSession(accessToken, refreshToken);
    } catch (ex) {
      // Invalid credentials
      throw new Error("Invalid email or password");
    }

    try {
      const response = await getUserDetails();
      localStorageService.setItem("user", response.data);
      const user = response.data;
      // console.log(user);
      dispatch({
        type: "LOGIN",
        payload: {
          user,
        },
      });
    } catch (ex) {
      console.error(ex);
    }

    //dispatch for the navigation
    dispatch({
      type: "",
    });
  };

  const register = async (email, username, password) => {
    const response = await axios.post("/api/auth/register", {
      email,
      username,
      password,
    });

    const { accessToken, user } = response.data;

    setSession(accessToken);

    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  const logout = () => {
    axios
      .get(apiConstants.LOGOUT)
      .then()
      .catch()
      .finally(() => {
        setSession(null);
        clearSession();
        dispatch({ type: "LOGOUT" });
      });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await getUserDetails();
          const user = response.data;

          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INIT",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    })();
  }, []);

  if (!state.isInitialised) {
    return <MatxLoading />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
