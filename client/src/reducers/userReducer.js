import { GET_USER, NO_USER, SIGN_OUT } from "../actions/types";
import appReducer from "../reducers";

const userReducer = (state = { success: null }, action) => {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case NO_USER:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
