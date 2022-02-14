import { initWhereClause } from "../utilities/createSegmentOperations";

function filterReducer(state, action) {
  switch (action.type) {
    case "ADD_DEF": {
      const label = Object.keys(action.payload)[0];
      // This is a temporary fix for country dropdown. Remove it once it starts functioning
      if (
        Array.isArray(action.payload[label]) &&
        !action.payload[label].length
      ) {
        return { ...state };
      }
      let operatorId = "";
      if (
        state["dropdownOperators"][label] &&
        state["dropdownOperators"][label][0]["ID"]
      ) {
        operatorId = state["dropdownOperators"][label][0]["ID"]; // Set first operator by default if present
      }

      const type = Array.isArray(action.payload[label])
        ? action.payload[label][0].TYPE
        : undefined;

      const whereClause = initWhereClause({
        selectedClauses: state["selectedClauses"],
        title: Array.isArray(action.payload[label])
          ? label
          : action.payload[label].itemDetails.ID,
        operator: operatorId.toString(),
        suffix: "",
        operatorId: operatorId.toString(),
        type,
        index: state.selectedClauses.length,
        isManualEntry: type ? "0" : "1",
        existingSegments: type ? "0" : "1",
        segmentTitle: type ? "" : label,
      });

      if (
        Array.isArray(action.payload[label]) &&
        action.payload[label][0].TYPE === "_STRING" &&
        (label === "CITY" || label === "STATE" || label.startsWith("ZIP"))
      ) {
        if (label === "CITY") {
          action.payload = { [label]: state.allCities };
        }
        if (label === "STATE") {
          action.payload = { [label]: state.allStates };
        }
        if (label.startsWith("ZIP")) {
          action.payload = { [label]: state.allZips };
        }
     }
      return {
        ...state,
        selectedClauses: [
          ...state.selectedClauses,
          { attribute: action.payload, whereClause, label },
        ],
      };
    }
    case "INIT_DROPDOWN":
      return {
        ...state,
        dropdownOperators: action.payload,
        isOperatorsLoaded: true,
      };
    case "REMOVE_DEF": {
      const selectedClauses = [
        ...state.selectedClauses.slice(0, action.payload - 1),
        ...state.selectedClauses.slice(action.payload),
      ];
      return {
        ...state,
        selectedClauses: selectedClauses,
      };
    }
    case "MODIFY_DEF": {
      state.selectedClauses[action.payload.index].whereClause =
        action.payload.whereClause;
      return state;
    }
    case "MODIFY_SEGMENT_DETAILS": {
      return {
        ...state,
        segmentDetails: {
          SegmentTitle: action.payload.SegmentTitle,
          SegDesc: action.payload.SegDesc,
          AddTags: action.payload.AddTags,
          IsDraft: action.payload.IsDraft,
          isSegEdit: action.payload.isSegEdit,
        },
      };
    }
    // Used while editing
    case "SET_SEGMENT": {
      return {
        ...state,
        segmentDetails: action.payload.segmentDetails,
        selectedClauses: action.payload.selectedClauses,
      };
    }

    case "SET_STATES": {
      return {
        ...state,
        allStates: action.payload.allStatesFull,
      };
    }

    case "SET_CITIES": {
      return {
        ...state,
        allCities: action.payload.allCitiesFull,
      };
    }

    case "SET_ZIPS": {
      return {
        ...state,
        allZips: action.payload.allZipsFull,
      };
    }

    case "SET_FILTER_COUNTS": {
      return {
        ...state,
        filterCounts: action.payload.filterCounts,
      };
    }
    case "SET_TOTAL_COUNT": {
      return {
        ...state,
        totalCount: action.payload.totalCount,
      };
    }

    case "SET_UPDATED_INDEX": {
      state.updatedIndex = action.payload.updatedIndex;
      return state;
    }

    case "SET_TOTAL_COUNT_DIRTY": {
      return {
        ...state,
        totalCountDirty: action.payload.totalCountDirty,
      };
    }

    default:
      throw new Error();
  }
}

export default filterReducer;
