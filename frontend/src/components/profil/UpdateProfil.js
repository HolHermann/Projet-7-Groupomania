import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio, updateUsername } from "../../actions/user.actions";
import Unsubscribe from "./Unsubscribe";
import UploadAvatar from "./UploadAvatar";
const UpdateProfil = () => {
  const userData = useSelector((state) => state.userReducer);
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [username, setUsername] = useState("");
  const [updateFormUsername, setupdateFormUsername] = useState(false);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  //
  const handleUpdate = () => {
    dispatch(updateBio(bio, userData.id));
    setUpdateForm(false);
  };
  const handleUpdateUsername = () => {
    dispatch(updateUsername(username, password, userData.id));
    setupdateFormUsername(false);
  };
  const cancelInfo = (e) => {
    if (e.target.id === "usernameChange") {
      setUsername("");
      setupdateFormUsername(!updateFormUsername);
    } else if (e.target.id === "bioPost") {
      setBio("");
      setUpdateForm(!updateForm);
    }
  };
  return (
    <>
      <section className="update-container">
        <div className="profil-container">
          <h2>{userData.username}</h2>
          <div className="pic-container">
            <img
              className="profil-picture"
              src={userData.avatar}
              alt={"Photo de profil de " + userData.username}
            />
            <UploadAvatar />
          </div>
          <div className="bio-update">
            <h2>Biographie</h2>

            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier la biographie
                </button>
              </>
            )}
            {updateForm && (
              <>
                <form className="update-profil-form">
                  <input
                    type="text"
                    name=""
                    id=""
                    defaultValue={userData.bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                  <button onClick={handleUpdate}>
                    Valider les modifications
                  </button>
                  <button id="bioPost" onClick={cancelInfo}>
                    Annuler
                  </button>
                </form>
              </>
            )}
          </div>
          <div className="username-update">
            <h2>Username</h2>
            {updateFormUsername === false && (
              <>
                <p onClick={() => setupdateFormUsername(!updateFormUsername)}>
                  {userData.username}
                </p>
                <button
                  onClick={() => setupdateFormUsername(!updateFormUsername)}
                >
                  Modifier l'username
                </button>
              </>
            )}
            {updateFormUsername && (
              <>
                <form className="update-profil-form">
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    defaultValue={userData.username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Veuillez renseigner votre mot de passe"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button onClick={handleUpdateUsername}>
                    Valider les modifications
                  </button>
                  <button id="usernameChange" onClick={cancelInfo}>
                    Annuler
                  </button>
                </form>
              </>
            )}
          </div>
          <div className="unsubscribe">
            <Unsubscribe user={userData} />
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateProfil;
