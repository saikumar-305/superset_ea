import { navigations } from "src/ea_oyster_components/navigations";
import { SET_USER_NAVIGATION } from "../actions/NavigationAction";

const initialState = [...navigations];

const NavigationReducer = function (state = initialState, action) {
  console.log("NavigationReducer called", action.type);
  switch (action.type) {
    case SET_USER_NAVIGATION: {
      console.log("SET_USER_NAVIGATION", action.payload);
      return [...action.payload];
    }
    default: {
      return [...state];
    }
  }
};

export default NavigationReducer;
