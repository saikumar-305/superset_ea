import axios from "axios.js";
import API_PATHS from "src/ea_oyster_components/constants/apiPaths";

const getVennReport = (segmentIDs) => {
  return axios.get(`${API_PATHS.SEGEMENTATION.GET_VENN_REPORT}/${segmentIDs}`);
};

export { getVennReport };
