/**
 * Returns left margin to e applid after PANNEL_LR_INDEX
 * @param {Array<object>} selectedClauses - Array of selected clauses
 * @param {number} index - Index of selectedClause to calculate margin of
 * @returns {string} - left margin in rem of the <WhereAttribute /> component
 */
const panelMarginCalculator = (selectedClauses, index) => {
  return (
    parseInt(selectedClauses[index].whereClause["PANNEL_LR_INDEX"]) * 1 + "rem"
  );
};

/**
 * Returns the default left-right index of AND/OR switch component
 * @param {Array<object>} selectedClauses - Array of selected clauses
 * @param {number} index - Index of selectedClause to calculate margin of
 * @returns {number}
 */
const AndOrLevelCalculator = (selectedClauses, index) => {
  if (!selectedClauses[index - 1]) {
    return 0;
  }
  if (
    parseInt(selectedClauses[index - 1].whereClause["PANNEL_LR_INDEX"]) >
    parseInt(selectedClauses[index].whereClause["PANNEL_LR_INDEX"])
  ) {
    return parseInt(selectedClauses[index].whereClause["PANNEL_LR_INDEX"]);
  } else {
    return parseInt(selectedClauses[index - 1].whereClause["PANNEL_LR_INDEX"]);
  }
};

export { panelMarginCalculator, AndOrLevelCalculator };
