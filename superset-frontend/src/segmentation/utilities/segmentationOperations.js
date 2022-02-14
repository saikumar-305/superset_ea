import axios from "src/ea_oyster_components/axios.js";

import API_PATHS from "src/ea_oyster_components/constants/apiPaths";

const cloneOperation = (requestBody) => {
  const url = `${API_PATHS.SEGEMENTATION.CLONE_SEGMENT}`;
  return axios.post(url, btoa(JSON.stringify(requestBody)));
};

const deleteOperation = (requestBody) => {
  const url = `${API_PATHS.SEGEMENTATION.DELETE_SEGMENT}`;
  return axios.post(url, btoa(JSON.stringify(requestBody)));
};

const getSingleSegmentView = (segmentID) => {
  return axios.get(
    `${API_PATHS.SEGEMENTATION.GET_SINGLE_SEGMENT_VIEW}/${segmentID}`
  );
};

const getSegmentedCustomers = (segmentIds) => {
  return axios.get(
    `${API_PATHS.SEGEMENTATION.GET_SEGMENT_CUSTOMERS}/${segmentIds.join()}`
  );
};

const getSegmentStats = (segmentIds) => {
  return axios.get(
    `${API_PATHS.SEGEMENTATION.GET_SEGMENT_STATS}/${segmentIds.join()}`
  );
};

// Used in edit segment to get the details of the exisiting segment
const getSingleSegment = (segmentId) => {
  return axios.get(
    `${API_PATHS.SEGEMENTATION.GET_SINGLE_SEGMENT}/${segmentId}`
  );
};

const getSegmentedCustomersByDef = (requestBody) => {
  return axios.post(
    `${API_PATHS.SEGEMENTATION.GET_SEGMENTED_CUSTOMERS_BY_DEF}`,
    btoa(JSON.stringify(requestBody))
  );
};

const getSegmentStatsByDef = (requestBody) => {
  return axios.post(
    `${API_PATHS.SEGEMENTATION.GET_STATS_DEV}`,
    btoa(JSON.stringify(requestBody))
  );
};

const sendToEpsilon = (requestBody) => {
  return axios.post(
    `${API_PATHS.SEGEMENTATION.SEND_TO_EPSILON}`,
    JSON.stringify(requestBody)
  );
};

//client id should be sent
const getColumnNamesForChecklist = () => {
  return axios.get(`${API_PATHS.SEGEMENTATION.GET_COLUMN_NAMES_CHECKLIST}`);
};

export {
  cloneOperation,
  getSingleSegmentView,
  deleteOperation,
  getSegmentedCustomers,
  getSegmentStats,
  getSingleSegment,
  getSegmentedCustomersByDef,
  getSegmentStatsByDef,
  sendToEpsilon,
  getColumnNamesForChecklist,
};
