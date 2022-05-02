import React from "react";

const Logout = () => {
  const handlelogout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
    <li onClick={handlelogout} tabIndex={0} onKeyPress={handlelogout}>
      <i className="fas fa-sign-out-alt" title="Déconnexion"></i>
    </li>
  );
};

export default Logout;
