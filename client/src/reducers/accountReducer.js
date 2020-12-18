import _ from "lodash";
import { FETCH_ACCOUNTS } from "../actions/types";

const accountReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ACCOUNTS:
      return { ...state, ..._.mapKeys(action.payload.data, "Id") };
    default:
      return state;
  }
};

export default accountReducer;
