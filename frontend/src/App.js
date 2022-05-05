import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Navbar from "./components/Navbar";
import { loginContext } from "./components/AppContext";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";
import { getUsers } from "./actions/users.actions";
import { isExpired, decodeToken } from "react-jwt";
import { getToken } from "./utils/utils";
const App = () => {
  const [uId, setUid] = useState(null);
  const [myToken, setMyToken] = useState(null);
  // on vérifie si le token est valide et non expiré
  const dispatch = useDispatch();
  const isLogged = () => {
    setUid(parseInt(localStorage.getItem("id")));
    setMyToken(getToken());
    if (myToken && uId) {
      const myDecodedToken = decodeToken(myToken);
      const isMyTokenExpired = isExpired(myToken);

      if (!myDecodedToken || isMyTokenExpired) {
        localStorage.clear(); // on vide le localstorage
        window.location = "/"; // redirection sur la page home
        return;
      } else if (uId && myDecodedToken && !isMyTokenExpired) {
        dispatch(getUser(uId));
        dispatch(getUsers());
      }
    }
  };

  useEffect(isLogged);

  return (
    // path="*" = tout lien en dehors des 3 précedents = redirection sur la page Home
    <loginContext.Provider value={uId}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </loginContext.Provider>
  );
};

export default App;
