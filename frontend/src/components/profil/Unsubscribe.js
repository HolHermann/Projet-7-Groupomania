import React from "react";
import axios from "axios";

const Unsubscribe = ({ user }) => {
  const leave = () => {
    // Suppresion du compte
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/user/delete/${user.id}`,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: { userId: user.id },
    }).then(() => {
      localStorage.clear(); // on vide le localstorage
      window.location = "/"; // redirection vers la page d'acceuil
    });
  };
  return (
    <p
      tabIndex={0}
      onClick={() => {
        if (
          window.confirm(
            // fenêtre de confirmation avant action
            `Voulez vous vraiment supprimer votre compte ${user.username} ?`
          )
        ) {
          leave();
        }
      }}
      onKeyPress={() => {
        if (
          window.confirm(
            `Voulez vous vraiment supprimer votre compte ${user.username} ?`
          )
        ) {
          leave();
        }
      }}
    >
      Supprimer le compte
    </p>
  );
};

export default Unsubscribe;
