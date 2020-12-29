import _ from "lodash";
import {
  FAILED_GROUPS,
  FETCH_GROUPS,
  IN_PROGRESS_GROUPS,
} from "../actions/types";
import errorReducer from "./errorReducer";

const chatterReducer = (
  state = { groups: {}, feedItems: {}, error: null, isFetching: false },
  action
) => {
  switch (action.type) {
    case FETCH_GROUPS:
      return {
        groups: {
          ...state.groups,
          ..._.mapKeys(action.payload.data.groups, "id"),
        },
        feedItems: { ...state.feedItems },
        error: null,
        isFetching: false,
      };
    case IN_PROGRESS_GROUPS:
      return { ...state, isFetching: true };
    case FAILED_GROUPS:
      return {
        ...errorReducer(state, action),
        isFetching: false,
      };
    default:
      return state;
  }
};

export default chatterReducer;
