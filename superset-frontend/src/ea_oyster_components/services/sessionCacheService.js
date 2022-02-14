import axios from "src/ea_oyster_components/axios.js";

/* refer to https://medium.com/@atif.ali.ati/user-session-in-react-js-aa749bc4faf6 */

var SessionCache = (function () {
  var countryList = null;
  var currencyList = {};

  var getCountryList = function () {
    return countryList;
  };

  var getCurrencyList = function () {
    return currencyList;
  };

  var setCountryList = function (countryListParam) {
    countryList = countryListParam;
  };

  var setCurrencyList = function (currencyListParam) {
    currencyList = currencyListParam;
  };
  /*
    var _initCountryList = function() {
      axios.get("/api/co/master/entity/country/list?sEcho=3&iDisplayStart=0&iDisplayLength=1000&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1&mDataProp_0=ctyCode&iColumns=1")
      .then(result => {
        countryList = result;
      })
      .catch((error) => {
          console.log(error);
      });
    }

    var _initCurrencyList = function() {
      axios.get("")
      .then(result => {
        currencyList = result;
      })
      .catch((error) => {
          console.log(error);
      });
    }
*/
  return {
    getCountryList: getCountryList,
    setCountryList: setCountryList,
    getCurrencyList: getCurrencyList,
  };
})();

export default SessionCache;
