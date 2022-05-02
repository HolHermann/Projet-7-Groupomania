import {
  GET_USER,
  UPDATE_USERNAME,
  UPDATE_BIO,
  UPLOAD_AVATAR,
} from "../../actions/user.actions";

const initialState = {};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;

    case UPLOAD_AVATAR:
      return { ...state, avatar: action.payload };

    case UPDATE_BIO:
      return { ...state, bio: action.payload };
    case UPDATE_USERNAME:
      return { ...state, username: action.payload };

    default:
      return state;
  }
}
