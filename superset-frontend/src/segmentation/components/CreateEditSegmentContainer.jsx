import React from "react";
import { FilterContextProvider } from "../context/FilterContext";
import CreateNewSegment from "./create-segment/CreateNewSegment";

const CreateEditSegmentContainer = ({ match }) => {
  return (
    <React.Fragment>
      <FilterContextProvider>
        <CreateNewSegment match={match} />
      </FilterContextProvider>
    </React.Fragment>
  );
};

export default CreateEditSegmentContainer;
