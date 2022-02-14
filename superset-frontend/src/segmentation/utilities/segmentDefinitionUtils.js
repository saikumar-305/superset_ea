const getDefinitionByAttributeName = (attributeName, criteriaAttributes) => {
  return { [attributeName]: criteriaAttributes[attributeName] };
};

/**
 * Utility function to decide to show suffix.
 * @param {any} criteria
 * @returns {boolean}
 */
const showSuffix = (criteria) => {
  return (
    criteria &&
    criteria["length"] &&
    criteria.length > 0 &&
    criteria.every((elem) => elem["SUFFIX"] !== "" && elem["SUFFIX"] !== "null")
  );
};

const getOperatorNameFromId = (operatorId, attributeName, allOperators) => {
  const operatorObj = allOperators[attributeName]?.find(
    (operator) => operator["ID"].toString() === operatorId.toString()
  );
  return operatorObj ? operatorObj["NAME"] : null;
};

export { getDefinitionByAttributeName, showSuffix, getOperatorNameFromId };
