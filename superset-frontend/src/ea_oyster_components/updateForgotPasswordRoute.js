import axios from "src/ea_oyster_components/axios";
import API_PATHS from "src/ea_oyster_components/constants/apiPaths";

const updateForgotPassword = (passwordRequestBody) => {
  const requestBody = btoa(JSON.stringify(passwordRequestBody));

  return axios.post(API_PATHS.USER_SERVICE.UPDATE_FORGOT_PASSWORD, requestBody);
};

const sendResetPasswordLink = (email) => {
  const requestBody = btoa(JSON.stringify(email));

  return axios.post(API_PATHS.USER_SERVICE.EMAIL_RESET_PASSWORD, requestBody);
};

export { updateForgotPassword, sendResetPasswordLink };
