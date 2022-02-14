import React, { useReducer, createContext, useContext } from "react";
import filterReducer from "./filterReducer";
import {
  getDropdownOperators,
  getAllStates,
  getAllCities,
  getAllZipCodes
} from "../utilities/createSegmentOperations";
import { CITY_LIST, STATE_LIST, ZIP_LIST } from "./MockGeoData";
import JWTAuthContext from "src/ea_oyster_components/contexts/JWTAuthContext";

function isMock(aClientId) {
  //601 is normal, 801 is Rebid
  return aClientId === 801; //Rebid
}

const initialState = {
  selectedClauses: [],
  segmentDetails: {
    SegmentTitle: "",
    SegDesc: "",
    AddTags: "",
    IsDraft: "0",
    isSegEdit: false,
  },
  // Only used while editing segment
  isOperatorsLoaded: false,
  // All states
  allStates: null,
  allCities: null,
  allZips: null,
  filterCounts: [],
  totalCount: null,
  updatedIndex: -1,
  totalCountDirty: true,
};
export const FilterContext = createContext(initialState);

export const FilterContextProvider = ({ children }) => {
  const { user } = useContext(JWTAuthContext);

  const [state, dispatch] = useReducer(filterReducer, initialState);

  // Adds an attribute to where clause
  function addAttribute(attribute) {
    dispatch({
      type: "ADD_DEF",
      payload: attribute,
    });
  }

  function removeAttribute(index) {
    dispatch({
      type: "REMOVE_DEF",
      payload: index,
    });
  }

  function modifyAttribute(newWhereClause, index) {
    dispatch({
      type: "MODIFY_DEF",
      payload: {
        whereClause: newWhereClause,
        index,
      },
    });
  }

  function setOperators() {
    if (state.dropdownOperators) {
      return state;
    }
    getDropdownOperators()
      .then((response) => {
        dispatch({
          type: "INIT_DROPDOWN",
          payload: response.data,
        });
      })
      .catch(console.error);
  }

  function modifySegmentDetails(
    segmentTitle,
    segmentDescription,
    tags,
    isSegEdit = false,
    isDraft = "0" // Always "0"
  ) {
    dispatch({
      type: "MODIFY_SEGMENT_DETAILS",
      payload: {
        SegmentTitle: segmentTitle,
        SegDesc: segmentDescription,
        AddTags: tags,
        IsDraft: isDraft,
        isSegEdit,
      },
    });
  }

  // Used when editing segment
  function setSegment(segmentDetails, selectedClauses) {
    // dispatch the event
    dispatch({
      type: "SET_SEGMENT",
      payload: {
        segmentDetails,
        selectedClauses,
      },
    });
  }

  function loadStates() {
    if (state.allStates) {
      return;
    }
    let allStatesFull;

    if (isMock(user.clientId)) {
      allStatesFull = STATE_LIST.map((el) => {
        return {
          ID: el,
          NAME: el,
          TYPE: "STRING",
          SUFFIX: "null"
        }
      });

      dispatch({
        type: "SET_STATES",
        payload: {
          allStatesFull: allStatesFull,
        },
      });
      return;
    }

    getAllStates()
      .then((response) => {
        const allStates = response.data["JSN"];
        allStatesFull = allStates.map((el) => {
          el.TYPE = "STRING";
          el.SUFFIX = "null";
          return el;
        });
        dispatch({
          type: "SET_STATES",
          payload: {
            allStatesFull,
          },
        });
      })
      .catch(console.error);
  }

  function loadCities() {
    if (state.allCities) {
      return;
    }
    let allCitiesFull;

    if (isMock(user.clientId)) {
      allCitiesFull = CITY_LIST.map((el) => {
        return {
          ID: el,
          NAME: el,
          TYPE: "STRING",
          SUFFIX: "null"
        }
      });

      dispatch({
        type: "SET_CITIES",
        payload: {
          allCitiesFull: allCitiesFull,
        },
      });
      return;
    }

    getAllCities()
      .then((response) => {
        const allCities = response.data["JSN"];
        allCitiesFull = allCities.map((el) => {
          el.TYPE = "STRING";
          el.SUFFIX = "null";
          return el;
        });

        dispatch({
          type: "SET_CITIES",
          payload: {
            allCitiesFull,
          },
        });
      })
      .catch(console.error);
  }

  function loadZips() {
    if (state.allZips) {
      return;
    }
    let allZipsFull;

    if (isMock(user.clientId)) {
      allZipsFull = ZIP_LIST.map((el) => {
        return {
          ID: el,
          NAME: el,
          TYPE: "STRING",
          SUFFIX: "null"
        }
      });

      dispatch({
        type: "SET_ZIPS",
        payload: {
          allZipsFull: allZipsFull,
        },
      });
      return;
    }

    getAllZipCodes()
      .then((response) => {
        const allZips = response.data["JSN"];
        allZipsFull = allZips.map((el) => {
          el.TYPE = "STRING";
          el.SUFFIX = "null";
          return el;
        });

        dispatch({
          type: "SET_ZIPS",
          payload: {
            allZipsFull,
          },
        });
      })
      .catch(console.error);
  }

  /*function loadZips() {
    if (state.allZips) {
      return;
    }
    let allZipsFull = ZIP_LIST.map((el) => {
      return {
        ID: el,
        NAME: el,
        TYPE: "STRING",
        SUFFIX: "null"
      }
    });
    
    //We are mocking it for now
    dispatch({
      type: "SET_ZIPS",
      payload: {
        allZipsFull: allZipsFull,
      },
    });
  }*/

  function setFilterCounts(filterCounts) {
    dispatch({
      type: "SET_FILTER_COUNTS",
      payload: {
        filterCounts,
      },
    });
  }

  function setTotalCount(totalCount) {
    dispatch({
      type: "SET_TOTAL_COUNT",
      payload: {
        totalCount,
      },
    });
  }

  function setUpdatedIndex(updatedIndex) {
    dispatch({
      type: "SET_UPDATED_INDEX",
      payload: {
        updatedIndex,
      },
    });
  }

  function setTotalCountDirty(totalCountDirty) {
    dispatch({
      type: "SET_TOTAL_COUNT_DIRTY",
      payload: {
        totalCountDirty,
      },
    });
  }

  return (
    <FilterContext.Provider
      value={{
        selectedClauses: state.selectedClauses,
        segmentDetails: state.segmentDetails,
        operators: state.dropdownOperators,
        isOperatorsLoaded: state.isOperatorsLoaded,
        allStates: state.allStates,
        allCities: state.allCities,
        allZips: state.allZips,
        filterCounts: state.filterCounts,
        totalCount: state.totalCount,
        updatedIndex: state.updatedIndex,
        totalCountDirty: state.totalCountDirty,
        addAttribute,
        removeAttribute,
        modifyAttribute,
        setOperators,
        modifySegmentDetails,
        setSegment,
        loadStates,
        loadCities,
        loadZips,
        setFilterCounts,
        setTotalCount,
        setUpdatedIndex,
        setTotalCountDirty,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
