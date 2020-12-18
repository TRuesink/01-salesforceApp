import _ from "lodash";
import { FETCH_CONTACTS } from "../actions/types";

const contactReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return { ...state, ..._.mapKeys(action.payload.data, "Id") };
    default:
      return state;
  }
};

export default contactReducer;
