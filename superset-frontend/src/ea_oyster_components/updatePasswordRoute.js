import axios from "axios.js";
import API_PATHS from "app/constants/apiPaths";

const updatePassword = (passwordRequestBody) => {
  const requestBody = btoa(JSON.stringify(passwordRequestBody));

  return axios.post(API_PATHS.USER_SERVICE.UPDATE_PASSWORD, requestBody);
};

export { updatePassword };
