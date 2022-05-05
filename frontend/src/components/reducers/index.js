import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import postReducer from "./post.reducer";
import usersReducer from "./users.reducer";

export default combineReducers({
  // exportation des reducers pour le store
  userReducer,
  postReducer,
  usersReducer,
});
