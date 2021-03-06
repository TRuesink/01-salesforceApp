import _ from "lodash";
import {
  ACCOUNT_SEARCH,
  CREATE_ACCOUNT,
  FETCH_ACCOUNTS,
  IN_PROGRESS_ACCOUNT,
  UPDATE_ACCOUNT,
} from "../actions/types";

const accountReducer = (
  state = { pagination: {}, data: {}, isFetching: false },
  action
) => {
  switch (action.type) {
    case FETCH_ACCOUNTS:
      return {
        pagination: action.payload.pagination,
        data: _.mapKeys(action.payload.data, "Id"),
        isFetching: false,
      };
    case CREATE_ACCOUNT:
      return { ...state, isFetching: false };
    case UPDATE_ACCOUNT:
      return {
        pagination: {},
        data: { [action.payload.data.Id]: action.payload.data },
        isFetching: false,
      };
    case ACCOUNT_SEARCH:
      return {
        pagination: {},
        data: _.mapKeys(action.payload.data.searchRecords, "Id"),
        isFetching: false,
      };
    case IN_PROGRESS_ACCOUNT:
      return { ...state, isFetching: true };
    default:
      return state;
  }
};

export default accountReducer;
