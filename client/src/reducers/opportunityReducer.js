import _ from "lodash";
import { FETCH_OPPORTUNITIES } from "../actions/types";

const opportunityReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_OPPORTUNITIES:
      return { ...state, ..._.mapKeys(action.payload.data, "Id") };
    default:
      return state;
  }
};

export default opportunityReducer;
