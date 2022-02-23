import { combineReducers } from "redux";
import userReducer from "./UserListReducer";

const rootReducer = combineReducers({
  allUsers: userReducer,
});

export default rootReducer;
