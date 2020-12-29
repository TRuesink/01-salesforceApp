import _ from "lodash";
import {
  CREATE_LEAD,
  FETCH_LEADS,
  IN_PROGRESS_LEAD,
  LEAD_SEARCH,
  UPDATE_LEAD,
} from "../actions/types";

const leadReducer = (
  state = { pagination: {}, data: {}, isFetching: false },
  action
) => {
  switch (action.type) {
    case FETCH_LEADS:
      return {
        pagination: action.payload.pagination,
        data: _.mapKeys(action.payload.data, "Id"),
        isFetching: false,
      };
    case CREATE_LEAD:
      return { ...state, isFetching: false };
    case UPDATE_LEAD:
      return {
        pagination: {},
        data: { [action.payload.data.Id]: action.payload.data },
        isFetching: false,
      };
    case LEAD_SEARCH:
      return {
        pagination: {},
        data: _.mapKeys(action.payload.data.searchRecords, "Id"),
        isFetching: false,
      };
    case IN_PROGRESS_LEAD:
      return { ...state, isFetching: true };
    default:
      return state;
  }
};

export default leadReducer;
