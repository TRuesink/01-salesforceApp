import _ from "lodash";
import { FETCH_METADATA } from "../actions/types";

const metadataReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_METADATA:
      console.log(action.payload);
      return { ...state, [action.payload.label]: action.payload };
    default:
      return state;
  }
};

export default metadataReducer;
