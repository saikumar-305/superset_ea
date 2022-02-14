/**
 * Returns HTML representation of a where clause. Used in segment details.
 * @param {any} segmentWhereClause
 * @returns {html}
 */
const parseWhereClause = (segmentWhereClause) => {
  if (!segmentWhereClause) {
    return;
  }
  const arrayWhere = [];
  segmentWhereClause.forEach((itm) => {
    var myObj = {};

    myObj["ID"] = itm.SegmentWhereClause.ID;
    myObj["CLIENT_ID"] = itm.SegmentWhereClause.CLIENT_ID;
    myObj["OPERATOR_ID"] = itm.SegmentWhereClause.OPERATOR_ID;
    myObj["VALUE1"] =
      itm.SegmentWhereClause.VALUE1 != null
        ? itm.SegmentWhereClause.VALUE1
        : "";
    myObj["VALUE2"] =
      itm.SegmentWhereClause.VALUE2 != null
        ? itm.SegmentWhereClause.VALUE2
        : "";
    myObj["SEGMENT_ID"] = itm.SegmentWhereClause.SEGMENT_ID;

    if (itm.SegmentWhereClause.IS_ACTIVE == "1") myObj["IS_ACTIVE"] = true;
    else myObj["IS_ACTIVE"] = false;

    myObj["NAME"] = itm.Operator.NAME;
    myObj["ATTRIBUTE"] = itm.Operator.ATTRIBUTE;
    myObj["OPERATOR"] = itm.Operator.OPERATOR;
    myObj["SWITCH_CONDITION"] = itm.SegmentWhereClause.SWITCH_CONDITION;
    myObj["AND_OR_INDEX"] = itm.SegmentWhereClause.AND_OR_INDEX;
    myObj["PANEL_INDEX"] = itm.SegmentWhereClause.PANEL_INDEX;
    myObj["ATTRIBUTE_SUFFIX_NAME"] =
      itm.SegmentWhereClause.ATTRIBUTE_SUFFIX_NAME;

    if (
      itm.Operator.ATTRIBUTE != null &&
      itm.Operator.ATTRIBUTE == "EXISTING_SEGMENT"
    ) {
      myObj["ATTRIBUTE"] = itm.SegmentWhereClause.VALUE1;
      myObj["OPERATOR"] = "";
      myObj["NAME"] = "";
      myObj["VALUE1"] = "";
      myObj["VALUE2"] = "";
    }

    arrayWhere.push(myObj);
  });

  let PANEL_INDEX = 0;
  let AND_OR_INDEX = 0;
  let divHtmlVar = "";

  arrayWhere.forEach((itm) => {
    if (itm.PANEL_INDEX == 0) PANEL_INDEX = 0;
    else if (itm.PANEL_INDEX == 1) PANEL_INDEX = 10;
    else PANEL_INDEX = 20;

    if (itm.AND_OR_INDEX == 0) AND_OR_INDEX = 0;
    else if (itm.AND_OR_INDEX == 1) AND_OR_INDEX = 10;
    else AND_OR_INDEX = 20;

    if (itm.VALUE2 == null || itm.VALUE2 == "") itm.VALUE2 = "";
    // if (itm.ATTRIBUTE_SUFFIX_NAME != null)
    //   ATTRIBUTE_SUFFIX_NAME = itm.ATTRIBUTE_SUFFIX_NAME;

    if (itm.SWITCH_CONDITION != null && itm.SWITCH_CONDITION != "") {
      divHtmlVar =
        divHtmlVar +
        '<div><label style="font-size: 12px;margin-left:' +
        AND_OR_INDEX +
        '%;font-weight:1"> ' +
        itm.SWITCH_CONDITION +
        "</label></div>";
    }
    if (itm.ATTRIBUTE_SUFFIX_NAME != null) {
      divHtmlVar =
        divHtmlVar +
        '<label style="font-size: 12px;margin-left:' +
        PANEL_INDEX +
        '%; font-weight:1"> <b>' +
        itm.ATTRIBUTE +
        " " +
        itm.ATTRIBUTE_SUFFIX_NAME +
        "</b> " +
        itm.NAME +
        " " +
        itm.VALUE1 +
        " " +
        itm.VALUE2 +
        " </label>";
    } else {
      divHtmlVar =
        divHtmlVar +
        '<label style="font-size: 12px;margin-left:' +
        PANEL_INDEX +
        '%; font-weight:1"> <b>' +
        itm.ATTRIBUTE +
        "</b> " +
        itm.NAME +
        " " +
        itm.VALUE1 +
        " " +
        itm.VALUE2 +
        " </label>";
    }
  });
  return divHtmlVar;
};

/**
 * Parses date string to a date object. If date cannot be parsed, it will return null
 * @param {string} dateString Eg: `01-Jun-2021`
 * @returns {Date|null}
 */
const parseDate = (dateString) => {
  const [day, monthShort, year] = dateString.split("-");
  const monthShortStrings = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const month = monthShortStrings.findIndex((el) => el === monthShort);
  return month > -1 ? new Date(year, month, day) : null;
};

/**
 * Date to string converter to set in context
 * @param {Date} dateObj
 * @returns {string}
 */
function dateFormatter(dateObj) {
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(dateObj);
  let mo = new Intl.DateTimeFormat("en", { month: "short" })
    .format(dateObj)
    .toUpperCase();
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(dateObj);
  return `${da}-${mo}-${ye}`;
}

function isWithinSelected(whereClause, allOperators, label) {
  const operatorId = whereClause["OPERATOR_ID"];
  const operator = allOperators[label]?.find(
    (operator) => operator["ID"].toString() === operatorId
  );
  if (!operator) {
    return false;
  }
  return operator["NAME"] === "WITHIN" || operator["NAME"] === "NOT WITHIN";
}

export { parseWhereClause, parseDate, dateFormatter, isWithinSelected };
