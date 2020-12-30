import _ from "lodash";
import {
  CONTACT_SEARCH,
  CREATE_CONTACT,
  FETCH_CONTACTS,
  IN_PROGRESS_CONTACT,
  UPDATE_CONTACT,
} from "../actions/types";

const contactReducer = (
  state = { pagination: {}, data: {}, isFetching: false },
  action
) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return {
        pagination: action.payload.pagination,
        data: _.mapKeys(action.payload.data, "Id"),
        isFetching: false,
      };
    case CREATE_CONTACT:
      return { ...state, isFetching: false };
    case UPDATE_CONTACT:
      return {
        pagination: {},
        data: { [action.payload.data.Id]: action.payload.data },
        isFetching: false,
      };
    case CONTACT_SEARCH:
      return {
        pagination: {},
        data: _.mapKeys(action.payload.data.searchRecords, "Id"),
        isFetching: false,
      };
    case IN_PROGRESS_CONTACT:
      return { ...state, isFetching: true };
    default:
      return state;
  }
};

export default contactReducer;
