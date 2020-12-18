import { LOADING, NOT_LOADING } from "../actions/types";

const formStatusReducer = (state = "", action) => {
  switch (action.type) {
    case LOADING:
      return "loading";
    case NOT_LOADING:
      return "";
    default:
      return state;
  }
};

export default formStatusReducer;
