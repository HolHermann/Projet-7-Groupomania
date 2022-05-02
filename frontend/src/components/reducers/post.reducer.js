import {
  GET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  UPDATE_POST_CONTENT,
  UPDATE_POST_PIC,
  DELETE_POST_PIC,
  DELETE_POST,
  DELETE_COMMENT,
  UPDATE_COMMENT,
} from "../../actions/post.actions";

const initialState = {};
export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case LIKE_POST:
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            Likes: [action.payload, ...post.Likes],
          };
        }
        return post;
      });
    case UNLIKE_POST:
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            Likes: post.Likes.filter(
              (like) => like.userId !== action.payload.userId
            ),
          };
        }
        return post;
      });

    case UPDATE_POST_CONTENT:
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            content: action.payload.content,
          };
        }

        return post;
      });
    case UPDATE_POST_PIC:
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            attachment: action.payload.attachment,
          };
        }

        return post;
      });
    case DELETE_POST_PIC:
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            attachment: action.payload.attachment,
          };
        }

        return post;
      });
    case DELETE_POST:
      return state.filter((post) => post.id !== action.payload.postId);
    case DELETE_COMMENT:
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            Comments: post.Comments.filter(
              (comment) => comment.id !== action.payload.commentId
            ),
          };
        }
        return post;
      });
    case UPDATE_COMMENT:
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            Comments: post.Comments.map((comment) => {
              if (comment.id === action.payload.commentId) {
                return {
                  ...comment,
                  content: action.payload.content,
                };
              } else return comment;
            }),
          };
        }
        return post;
      });

    default:
      return state;
  }
}
