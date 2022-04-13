import axios from "src/ea_oyster_components/axios";
import apiConstants from "src/ea_oyster_components/constants/apiPaths";
export const SET_USER_NAVIGATION = "SET_USER_NAVIGATION";

const getfilteredNavigations = (navList = [], role) => {
  return navList.reduce((array, nav) => {
    if (nav.auth) {
      if (nav.auth.includes(role)) {
        array.push(nav);
      }
    } else {
      if (nav.children) {
        nav.children = getfilteredNavigations(nav.children, role);
        array.push(nav);
      } else {
        array.push(nav);
      }
    }
    return array;
  }, []);
};

export function getNavigationByUser() {
  return (dispatch, getState) => {
    let { user, navigations = [] } = getState();

    let filteredNavigations = getfilteredNavigations(navigations, user.role);

    dispatch({
      type: SET_USER_NAVIGATION,
      payload: [...filteredNavigations],
    });
  };
}

export function getDynamicNavigationByUser() {
  // console.log("getDynamicNavigationByUser");
  return (dispatch, getState) => {
    axios.defaults.withCredentials = false;
    let url = apiConstants.GET_MENUITEMS;

    axios
      .get(url)
      .then((response) => {
        getNavigations(dispatch, response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

const getNavigations = (dispatch, response) => {
  console.log("navigations", response.data);
  //the dispatch below is the argument from this function
  let arr = [];
  for (var k in response.data) {
    arr.push(response.data[k]);
  }

  dispatch({
    type: SET_USER_NAVIGATION,
    payload: [...arr],
  });
};
