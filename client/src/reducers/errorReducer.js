import { ERROR, NO_ERROR } from "../actions/types";

const errorReducer = (state = { error: false, message: null }, action) => {
  switch (action.type) {
    case ERROR:
      return { error: true, message: action.payload.data.error };
    case NO_ERROR:
      return { error: false, message: null };
    default:
      return state;
  }
};
export default errorReducer;
