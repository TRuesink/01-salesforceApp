import _ from "lodash";
import { FETCH_ACCOUNTS, IN_PROGRESS_ACCOUNT } from "../actions/types";

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
    case IN_PROGRESS_ACCOUNT:
      return { ...state, isFetching: true };
    default:
      return state;
  }
};

export default accountReducer;
