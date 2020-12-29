import {
  FETCH_TASKS,
  IN_PROGRESS_TASK,
  UPDATE_TASK,
  CREATE_TASK,
} from "../actions/types";
import _ from "lodash";

const taskReducer = (
  state = { pagination: {}, data: {}, isFetching: false },
  action
) => {
  switch (action.type) {
    case FETCH_TASKS:
      return {
        pagination: action.payload.pagination,
        data: _.mapKeys(action.payload.data, "Id"),
        isFetching: false,
      };
    case UPDATE_TASK:
      return {
        ...state,
        data: { ...state.data, [action.payload.data.Id]: action.payload.data },
        isFetching: false,
      };
    case CREATE_TASK:
      return {
        ...state,
        data: { ...state.data },
        isFetching: false,
      };
    case IN_PROGRESS_TASK:
      return { ...state, isFetching: true };
    default:
      return state;
  }
};

export default taskReducer;
