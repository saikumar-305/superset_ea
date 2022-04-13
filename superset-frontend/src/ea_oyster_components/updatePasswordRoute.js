import axios from "src/ea_oyster_components/axios.js";
import API_PATHS from "src/ea_oyster_components/constants/apiPaths";

const updatePassword = (passwordRequestBody) => {
  const requestBody = btoa(JSON.stringify(passwordRequestBody));

  return axios.post(API_PATHS.USER_SERVICE.UPDATE_PASSWORD, requestBody);
};

export { updatePassword };
