import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [loginModal, setLoginModal] = useState(props.login);
  const handleModals = (e) => {
    if (e.target.id === "signup") {
      setSignUpModal(true);
      setLoginModal(false);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setLoginModal(true);
    }
  };
  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            tabIndex={0}
            onKeyPress={handleModals}
            onClick={handleModals}
            id="signup"
            className={signUpModal ? "active-btn" : null}
          >
            S'inscrire
          </li>
          <li
            tabIndex={0}
            onKeyPress={handleModals}
            onClick={handleModals}
            id="login"
            className={loginModal ? "active-btn" : null}
          >
            Se connecter
          </li>
        </ul>

        {signUpModal && <SignUpForm />}
        {loginModal && <LoginForm />}
      </div>
    </div>
  );
};

export default Log;
