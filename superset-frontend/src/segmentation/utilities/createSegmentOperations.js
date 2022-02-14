import axios from "src/ea_oyster_components/axios.js";
import API_PATHS from "src/ea_oyster_components/constants/apiPaths";
import { dateFormatter } from "./segmentationUtils";

const LeftNavLoad = () => {
  return axios.get(`${API_PATHS.SEGEMENTATION.INIT_NEW_SEGMENT}`);
};

const getCriteriaAttribute = () => {
  return axios.get(`${API_PATHS.SEGEMENTATION.INIT_CRITERIA}`);
};

const getDropdownOperators = () => {
  return axios.get(`${API_PATHS.SEGEMENTATION.INIT_PARTICULAR_DROPDOWN}`);
};

/**
 * Returns the response of waterfall counts as a promise
 * @param {any} segmentDetails - Segment details
 * @param {Array<any>} whereClauses - Where clauses
 * @param {number(int)} index
 * @returns {Promise<any>}
 */
const getWaterFallCounts = (segmentDetails, whereClauses, index) => {
  const requestBody = btoa(
    JSON.stringify({
      ...segmentDetails,
      whereClause: whereClauses,
      blockIdNumber: index,
    })
  );
  return axios.post(API_PATHS.SEGEMENTATION.GET_WATERFALL_COUNTS, requestBody);
};

const initWhereClause = ({
  selectedClauses,
  title,
  operator,
  suffix,
  operatorId,
  type,
  index,
  value1,
  value2 = "",
  switchOrAnd = "AND",
  selectedValue = "",
  pannelIndex,
  andOrIndex,
  existingSegments = "0",
  isChecked = "1",
  isActive = "1",
  isManualEntry = 0,
  segmentTitle = "",
}) => {
  if (!selectedClauses.length) {
    andOrIndex = "0";
    pannelIndex = "0";
  } else if (
    typeof andOrIndex === "undefined" ||
    typeof pannelIndex === "undefined"
  ) {
    andOrIndex = index // Set andOrIndex based on panel index of previous
      ? selectedClauses[selectedClauses.length - 1].whereClause[
      "PANNEL_LR_INDEX"
      ] || "0"
      : "0";
    pannelIndex = andOrIndex;
  }
  // Init date, ** this was changed to investigate date problem
  if (type === "DATE" || type === "date") {
    value1 = dateFormatter(new Date());
  }

  return {
    title,
    isChecked: isChecked,
    operator,
    selValue: selectedValue,
    SUFFIX: suffix,
    OPERATOR_ID: operatorId,
    VALUE1: value1,
    VALUE2: value2,
    IS_ACTIVE: isActive,
    TYPE: type,
    PANNEL_LR_INDEX: pannelIndex,
    ANDOR_LR_INDEX: andOrIndex,
    INDEX: index,
    SWITCH: switchOrAnd,
    EXISTING_SEGMENTS: existingSegments,
    IS_MANUAL_ENTRY: isManualEntry,
    SEGMENT_TITLE: segmentTitle,
  };
};

const updateWhereClause = (oldClause, updates) => {
  return { ...oldClause, ...updates };
};

const saveSegment = (segmentDetails, whereClauses) => {
  const requestBody = btoa(
    JSON.stringify({ ...segmentDetails, whereClause: whereClauses })
  );
  return axios.post(API_PATHS.SEGEMENTATION.CREATE_NEW_SEGMENT, requestBody);
};

const getAllStates = () => {
  return axios.get(API_PATHS.SEGEMENTATION.GET_ALL_STATES);
};

const getAllCities = () => {
  return axios.get(API_PATHS.SEGEMENTATION.GET_ALL_CITIES);
};

const getAllZipCodes = () => {
  return axios.get(API_PATHS.SEGEMENTATION.GET_ALL_ZIPCODES);
};

export {
  LeftNavLoad,
  getCriteriaAttribute,
  getDropdownOperators,
  getWaterFallCounts,
  initWhereClause,
  updateWhereClause,
  saveSegment,
  getAllStates,
  getAllCities,
  getAllZipCodes
};
