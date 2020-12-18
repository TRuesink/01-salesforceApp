import { CLICK } from "../actions/types";

const filterMenuReducer = (state = false, action) => {
  switch (action.type) {
    case CLICK:
      return !state;
    default:
      return state;
  }
};

export default filterMenuReducer;
