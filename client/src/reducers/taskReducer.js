import { FETCH_TASKS, UPDATE_TASK } from "../actions/types";
import _ from "lodash";

const taskReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return _.mapKeys(action.payload.data, "Id");
    case UPDATE_TASK:
      return { ...state, [action.payload.data.Id]: action.payload.data };
    default:
      return state;
  }
};

export default taskReducer;
