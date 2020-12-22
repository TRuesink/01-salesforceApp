import _ from "lodash";
import {
  CREATE_OPPORTUNITY,
  FETCH_OPPORTUNITIES,
  UPDATE_OPPORTUNITY,
} from "../actions/types";

const opportunityReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_OPPORTUNITIES:
      return _.mapKeys(action.payload.data, "Id");
    //return { ...state, ..._.mapKeys(action.payload.data, "Id") };
    case CREATE_OPPORTUNITY:
      return state;
    case UPDATE_OPPORTUNITY:
      return { ...state, ..._.mapKeys(action.payload, "Id") };
    default:
      return state;
  }
};

export default opportunityReducer;
