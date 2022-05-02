import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { loginContext } from "./AppContext";
import Logout from "./Log/Logout";
import { useSelector } from "react-redux";
const Navbar = () => {
  const uId = useContext(loginContext);
  const userData = useSelector((state) => state.userReducer);
  return (
    <header>
      <div className="logo-container">
        <img src="../images/icon_white.png" alt="Logo" />
        <h1>Groupomania</h1>
      </div>
      <nav>
        {uId ? (
          <ul>
            <li>
              <NavLink to="/profil" title="Aller sur votre profil">
                <img
                  className="avatar-min"
                  src={userData.avatar}
                  alt="Photode profil"
                />
                <span> Bienvenue {userData.username}</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/feed">Trending</NavLink>
            </li>

            <Logout />
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/">Connexion</NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
