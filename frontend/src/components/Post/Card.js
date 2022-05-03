import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePostContent,
  updatePostPic,
  deletePostPic,
  deletePost,
} from "../../actions/post.actions";

import { loginContext } from "../AppContext";
import { isEmpty } from "../../utils/utils";
import { onUploadLabel } from "../../utils/utils";

import DeleteCard from "./DeleteCard";
import LikeBtn from "./LikeBtn";
import CardComments from "./CardComments";

const Card = ({ post }) => {
  const dispatch = useDispatch();
  const uId = useContext(loginContext);
  const [loading, setLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);

  const sendStore = async () => {
    if (textUpdate) dispatch(updatePostContent(post.id, uId, textUpdate));
  };
  const cancel = () => {
    setFile("");
    document.querySelector(".card-picture").src = post.attachment;
  };

  const updateText = async () => {
    sendStore().then(() => {
      setIsUpdated(false);
    });
  };
  const handlePic = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", file);
    dispatch(updatePostPic(post.id, data));
    setFile("");
  };
  useEffect(() => {
    !isEmpty(post) && setLoading(false);
  }, [post, userData.isAdmin, dispatch]);
  return (
    <li className="card-container" key={post.id}>
      {loading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <article>
            <div className="card-header">
              <div className="card-avatar">
                <img
                  className="avatar-min"
                  src={post.User.avatar}
                  alt={"Photo de profil de " + post.User.username}
                />
              </div>
              <h2>{post.User.username}</h2>
              <span className="card-date">{post.createdAt}</span>
            </div>
            <div className="card-contents">
              {isUpdated === false && (
                <p className="card-content">{post.content}</p>
              )}
              {post.attachment !== "" && (
                <div>
                  <img
                    className="card-picture"
                    id={post.id}
                    src={post.attachment}
                    alt={post.content}
                  />
                  {userData.id === post.userId && (
                    <form action="" id={post.id} onSubmit={handlePic}>
                      <label
                        tabIndex={0}
                        onKeyPress={onUploadLabel}
                        htmlFor="image"
                      >
                        Changer la photo
                      </label>
                      <input
                        className="hidden"
                        type="file"
                        name="image"
                        id="image"
                        accept=".jpg, .jpeg, .png, .gif"
                        onChange={(e) => {
                          if (e.target.files[0].size > 3670016)
                            return alert("Fichier trop volumineux");
                          const idpost = post.id;
                          console.log(idpost);
                          document.querySelector(".card-picture").src =
                            URL.createObjectURL(e.target.files[0]);
                          setFile(e.target.files[0]);
                        }}
                      />
                      {file ? (
                        <>
                          <input type="submit" value="Valider" />
                          <button onClick={cancel}>Annuler</button>
                        </>
                      ) : null}
                    </form>
                  )}
                  {userData.id === post.userId || userData.isAdmin === true ? (
                    <div>
                      <label
                        tabIndex={0}
                        onClick={() => {
                          if (
                            window.confirm(
                              `Voulez vous vraiment supprimer la photo ?`
                            )
                          ) {
                            if (post.content === "") {
                              dispatch(deletePost(post.id));
                            } else {
                              dispatch(deletePostPic(post.id, uId));
                              window.location = "/feed";
                            }
                          }
                        }}
                        onKeyPress={() => {
                          if (
                            window.confirm(
                              `Voulez vous vraiment supprimer la photo ?`
                            )
                          ) {
                            if (post.content === "") {
                              dispatch(deletePost(post.id));
                            } else {
                              dispatch(deletePostPic(post.id, uId));
                              window.location = "/feed";
                            }
                          }
                        }}
                        htmlFor="supprimer"
                      >
                        Supprimer la photo
                      </label>
                    </div>
                  ) : null}
                </div>
              )}
              {isUpdated && (
                <div className="update-post">
                  <textarea
                    className="update-content-post"
                    defaultValue={post.content}
                    onChange={(e) => setTextUpdate(e.target.value)}
                  />
                  <div className="update-btn-container">
                    <button className="btn" onClick={updateText}>
                      Valider les modifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="edit-ctrl-container">
              {userData.id === post.userId && (
                <>
                  <div className="btn-container">
                    <div
                      onClick={() => setIsUpdated(!isUpdated)}
                      tabIndex={0}
                      onKeyPress={() => setIsUpdated(!isUpdated)}
                    >
                      <i
                        className="fas fa-edit"
                        title="Modifier la description"
                      ></i>
                    </div>
                  </div>
                </>
              )}
              {userData.id === post.userId || userData.isAdmin === true ? (
                <div className="btn-container">
                  <DeleteCard id={post.id} />
                </div>
              ) : null}
            </div>
            <div className="card-footer">
              <div
                tabIndex={0}
                className="comment-icon"
                onKeyPress={() => setShowComments(!showComments)}
                onClick={() => setShowComments(!showComments)}
              >
                <i
                  className="fas fa-comment-dots"
                  title="Voir les commentaires"
                ></i>
                <span>{post.Comments.length}</span>
              </div>
              <LikeBtn post={post} />
            </div>
            {showComments && <CardComments post={post} />}
          </article>
        </>
      )}
    </li>
  );
};

export default Card;
