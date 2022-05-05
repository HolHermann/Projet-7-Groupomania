import React from "react";
import axios from "axios";
import { useState } from "react";
import LoginForm from "./LoginForm";
// Formulaire de création d'un compte
const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [username, setUserNameValue] = useState("");
  const [bio, setBioValue] = useState("");
  const [email, setEmailValue] = useState("");
  const [password, setPasswordValue] = useState("");
  const [passwordConfirm, setPasswordConfirmValue] = useState("");
  const handleSignUp = (e) => {
    e.preventDefault();
    const loginError = document.querySelector(".loginError");
    if (password !== passwordConfirm) {
      return (loginError.innerHTML =
        "Les mots de passe ne sont pas identiques");
    }
    // Communication avec le back grâce à axios
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/register`, // url route back
      withCredentials: false,
      data: {
        username,
        email,
        password,
        bio,
      },
    })
      .then((res) => {
        setFormSubmit(true);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 422 && err.response.data.username) {
          loginError.innerHTML = err.response.data.username.msg;
        } else if (err.response.status === 422 && err.response.data.email) {
          loginError.innerHTML = err.response.data.email.msg;
        } else if (err.response.status === 422 && err.response.data.message) {
          loginError.innerHTML = err.response.data.message;
        } else if (err.response.data.message) {
          loginError.innerHTML = err.response.data.message;
        } else if (err.response.status === 422 && err.response.data.bio) {
          loginError.innerHTML = err.response.data.bio.msg;
        } else if (err.response.status === 400) {
          loginError.innerHTML = err.response.data.sqlMessage;
        } else {
          console.log(err);
        }
      });
  };

  return (
    <>
      {formSubmit ? ( // si création du compte ok on affiche le component pour se conencter
        <>
          <LoginForm />
          <span className="valid">
            Votre compte a été crée avec succés, vous pouvez desormais vous
            connecter.
          </span>
        </>
      ) : (
        <form onSubmit={handleSignUp} id="logForm">
          <label htmlFor="userName">Username</label>
          <br />
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Votre Username"
            onChange={(e) => setUserNameValue(e.target.value)}
            value={username}
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Votre adresse mail"
            onChange={(e) => setEmailValue(e.target.value)}
            value={email}
          />
          <br />
          <label htmlFor="bio">Biographie</label>
          <br />
          <input
            type="text"
            name="bio"
            id="bio"
            placeholder="Décrivez-vous"
            onChange={(e) => setBioValue(e.target.value)}
            value={bio}
          />
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Votre mot de passe"
            onChange={(e) => setPasswordValue(e.target.value)}
            value={password}
          />
          <br />
          <label htmlFor="password-confirm">Confirmer mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password-confirm"
            placeholder="Confirmation du mot de passe"
            onChange={(e) => setPasswordConfirmValue(e.target.value)}
            value={passwordConfirm}
          />
          <div className="loginError"></div>
          <br />

          <input type="submit" value="S'inscrire" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
