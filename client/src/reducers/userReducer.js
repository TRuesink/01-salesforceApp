import { GET_USER, IN_PROGRESS_USER, NO_USER } from "../actions/types";

const userReducer = (state = { success: null, isFetching: false }, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, ...action.payload, isFetching: false };
    case NO_USER:
      return { ...state, ...action.payload, isFetching: false };
    case IN_PROGRESS_USER:
      return { ...state, isFetching: true };
    default:
      return state;
  }
};

export default userReducer;
