import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onUploadLabel } from "../../utils/utils";
import {
  createPostContent,
  createPostWithPic,
  getPosts,
} from "../../actions/post.actions";
//Création d'un post
const NewPostForm = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");

  const [file, setFile] = useState();
  const [postPic, setPostPic] = useState(null); //Prévisualiser
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (userData !== null) setIsLoading(false);
  }, [userData]);
  const newPost = {
    userId: userData.id,
    content,
    attachment: "",
  };
  const handlePost = () => {
    if (file) {
      const data = new FormData();
      data.append("post", JSON.stringify(newPost));
      data.append("image", file);
      dispatch(createPostWithPic(data)).then(() => {
        // créer un post avec une photo
        dispatch(getPosts());
        cancelPost();
      });
    } else if (content && content.trim().length !== 0) {
      dispatch(createPostContent(userData.id, content)).then(() => {
        // créer un post avec du texte
        dispatch(getPosts());
        cancelPost();
      });
    } else {
      alert("Un post ne peut pas être vide.");
      cancelPost();
    }
  };
  const handlePicture = (e) => {
    setPostPic(URL.createObjectURL(e.target.files[0]));
  };
  const cancelPost = () => {
    setContent("");
    setPostPic("");
    setFile("");
  };

  return (
    <div className="post-form-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="form-header">
            <img
              src={userData.avatar}
              alt={"Photo de profil de " + userData.username}
              className="avatar-min"
            />
          </div>
          <div className="post-form">
            <textarea
              name="content-post"
              id="content-post"
              placeholder={"Que voulez-vous dire " + userData.username + " ?"}
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />

            <div className="footer-form">
              <div className="icon-container">
                <label
                  htmlFor="image-upload"
                  tabIndex={0}
                  onKeyPress={onUploadLabel}
                >
                  <i
                    className="fa fa-file-image-o"
                    title="Télécharger une image"
                  ></i>
                </label>

                <input
                  type="file"
                  name="image"
                  id="image-upload"
                  accept=".jpg, .jpeg, .gif, .png"
                  onChange={(e) => {
                    handlePicture(e);
                    setFile(e.target.files[0]);
                  }}
                />
                {content || postPic ? (
                  <article className="preview-article">
                    <div className="card-header">
                      <div className="avatar-container">
                        <img
                          src={userData.avatar}
                          alt={"Photo de profil de " + userData.username}
                          className="avatar-min"
                        />
                      </div>
                      <h2>{userData.username}</h2>
                    </div>
                    <div>
                      {/* card-content */}
                      <p className="preview-content"> {content}</p>
                      <img className="pre-render-pic" src={postPic} alt="" />
                    </div>
                  </article>
                ) : null}
              </div>
              <div className="btn-send-form-container">
                {content || postPic ? (
                  <>
                    <button
                      className="cancel"
                      onKeyPress={cancelPost}
                      onClick={cancelPost}
                    >
                      Annuler
                    </button>
                    <button className="send" onClick={handlePost}>
                      Envoyer
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
