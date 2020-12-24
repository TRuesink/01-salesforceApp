import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import userReducer from "./userReducer";
import loadingReducer from "./loadingReducer";
import { SIGN_OUT } from "../actions/types";
import accountReducer from "./accountReducer";
import contactReducer from "./contactReducer";
import opportunityReducer from "./opportunityReducer";
import metadataReducer from "./metadataReducer";
import editModeReducer from "./editModeReducer";
import taskReducer from "./taskReducer";

const appReducer = combineReducers({
  form: formReducer,
  loadingStatus: loadingReducer,
  user: userReducer,
  metadata: metadataReducer,
  accounts: accountReducer,
  contacts: contactReducer,
  opportunities: opportunityReducer,
  editing: editModeReducer,
  tasks: taskReducer,
});

const rootReducer = (state, action) => {
  if (action.type === SIGN_OUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
