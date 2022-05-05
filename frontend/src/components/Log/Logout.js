import React from "react";
// Déconnexion du compte
const Logout = () => {
  const handlelogout = () => {
    localStorage.clear(); // suppression des données du localstorage
    window.location = "/"; // redirection sur le page d'acceil
  };

  return (
    <li onClick={handlelogout} tabIndex={0} onKeyPress={handlelogout}>
      <i className="fas fa-sign-out-alt" title="Déconnexion"></i>
    </li>
  );
};

export default Logout;
