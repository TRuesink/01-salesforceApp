import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import userReducer from "./userReducer";
import { SIGN_OUT } from "../actions/types";
import accountReducer from "./accountReducer";
import contactReducer from "./contactReducer";
import opportunityReducer from "./opportunityReducer";
import metadataReducer from "./metadataReducer";
import editModeReducer from "./editModeReducer";
import taskReducer from "./taskReducer";
import chatterReducer from "./chatterReducer";
import leadReducer from "./leadReducer";
import errorReducer from "./errorReducer";

const appReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  metadata: metadataReducer,
  accounts: accountReducer,
  contacts: contactReducer,
  opportunities: opportunityReducer,
  editing: editModeReducer,
  tasks: taskReducer,
  chatter: chatterReducer,
  leads: leadReducer,
  error: errorReducer,
});

const rootReducer = (state, action) => {
  if (action.type === SIGN_OUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
