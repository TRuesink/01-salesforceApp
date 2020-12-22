import { EDIT, VIEW } from "../actions/types";

const editModeReducer = (state = false, action) => {
  switch (action.type) {
    case EDIT:
      return true;
    case VIEW:
      return false;
    default:
      return state;
  }
};

export default editModeReducer;
