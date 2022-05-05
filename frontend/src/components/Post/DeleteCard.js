import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";

// Suppresion d'un post
const DeleteCard = ({ id }) => {
  const dispatch = useDispatch();
  const deleteArticle = () => {
    dispatch(deletePost(id));
  };

  return (
    <div
      tabIndex={0}
      onKeyPress={() => {
        if (window.confirm("Voulez vous vraiment supprimer ce post ?")) {
          // Fenêtre de confirmation avant action
          deleteArticle();
        }
      }}
      onClick={() => {
        if (window.confirm("Voulez vous vraiment supprimer ce post ?")) {
          deleteArticle();
        }
      }}
    >
      <i className="fa fa-trash" title="Supprimer le post"></i>
    </div>
  );
};

export default DeleteCard;
