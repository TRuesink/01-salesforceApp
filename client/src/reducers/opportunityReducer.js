import _ from "lodash";
import {
  CREATE_OPPORTUNITY,
  FETCH_OPPORTUNITIES,
  UPDATE_OPPORTUNITY,
  IN_PROGRESS_OPPORTUNITY,
} from "../actions/types";

const opportunityReducer = (
  state = { pagination: {}, data: {}, isFetching: false },
  action
) => {
  switch (action.type) {
    case FETCH_OPPORTUNITIES:
      return {
        pagination: action.payload.pagination,
        data: _.mapKeys(action.payload.data, "Id"),
        isFetching: false,
      };
    //return { ...state, ..._.mapKeys(action.payload.data, "Id") };
    case CREATE_OPPORTUNITY:
      return { ...state, isFetching: false };
    case UPDATE_OPPORTUNITY:
      return {
        pagination: {},
        data: { [action.payload.data.Id]: action.payload.data },
        isFetching: false,
      };
    case IN_PROGRESS_OPPORTUNITY:
      return { ...state, isFetching: true };
    default:
      return state;
  }
};

export default opportunityReducer;
