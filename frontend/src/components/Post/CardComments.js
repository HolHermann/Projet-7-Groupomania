import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getPosts } from "../../actions/post.actions";
import DeleteEditComment from "./DeleteEditComment";

const CardComments = ({ post }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const handleComment = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(createComment(userData.id, post.id, text))
        .then(() => {
          dispatch(getPosts());
        })
        .then(() => setText(""));
    } else {
      alert("Veuillez saisir du texte");
    }
  };

  return (
    <div className="comments-container">
      {post.Comments.map((comment) => {
        return (
          <article
            className={
              comment.userId === userData.id
                ? "comment-container-owner"
                : "comment-container"
            }
            key={comment.id}
          >
            <div className="header-comment">
              <img
                className="avatar-min"
                src={
                  usersData.length >= 0
                    ? usersData
                        .map((user) => {
                          if (user.id === comment.userId) return user.avatar;
                          else return null;
                        })
                        .join("")
                    : null
                }
                alt={"Avatar"}
              />

              <h2>
                {usersData.length >= 0 &&
                  usersData
                    .map((user) => {
                      if (user.id === comment.userId) return user.username;
                      else return null;
                    })
                    .join("")}
              </h2>
              <span>{comment.createdAt}</span>
            </div>

            <div className="comment-footer">
              <p>{comment.content}</p>

              <div className="edit-comment-container">
                {userData.id === comment.userId || userData.isAdmin === true ? (
                  <DeleteEditComment comment={comment} postId={post.id} />
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
      {userData.id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            id="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder={
              post.Comments.length === 0
                ? "Soyez le premier à commenter"
                : "Commenter"
            }
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  );
};

export default CardComments;
