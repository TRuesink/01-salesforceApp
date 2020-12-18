import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import formStatusReducer from "./formStatusReducer";
import userReducer from "./userReducer";

import { SIGN_OUT } from "../actions/types";
import filterMenuReducer from "./filterMenuReducer";
import accountReducer from "./accountReducer";
import contactReducer from "./contactReducer";
import opportunityReducer from "./opportunityReducer";

const appReducer = combineReducers({
  form: formReducer,
  formStatus: formStatusReducer,
  user: userReducer,
  filterMenuStatus: filterMenuReducer,
  accounts: accountReducer,
  contacts: contactReducer,
  opportunities: opportunityReducer,
});

const rootReducer = (state, action) => {
  if (action.type === SIGN_OUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
