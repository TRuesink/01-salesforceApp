//import _ from "lodash";
import { FETCH_METADATA, FETCH_PATHS } from "../actions/types";

const metadataReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_METADATA:
      return { ...state, [action.payload.label]: action.payload };
    case FETCH_PATHS:
      return { ...state, paths: action.payload };
    default:
      return state;
  }
};

export default metadataReducer;
