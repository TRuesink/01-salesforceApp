import _ from "lodash";
import {
  CREATE_OPPORTUNITY,
  FETCH_OPPORTUNITIES,
  UPDATE_OPPORTUNITY,
} from "../actions/types";

const opportunityReducer = (state = { pagination: {}, data: {} }, action) => {
  switch (action.type) {
    case FETCH_OPPORTUNITIES:
      return {
        pagination: action.payload.pagination,
        data: _.mapKeys(action.payload.data, "Id"),
      };
    //return { ...state, ..._.mapKeys(action.payload.data, "Id") };
    case CREATE_OPPORTUNITY:
      return state;
    case UPDATE_OPPORTUNITY:
      return {
        pagination: {},
        data: { [action.payload.data.Id]: action.payload.data },
      };
    default:
      return state;
  }
};

export default opportunityReducer;
