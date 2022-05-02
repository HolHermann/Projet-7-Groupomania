import React from "react";

const Footer = () => {
  return (
    <footer>
      <ul>
        <li>
          <a href="http://groupomania.com" onClick={(e) => e.preventDefault()}>
            Site de l'entreprise
          </a>
        </li>
        <li>
          <a
            href="https://openclassrooms.com/fr/paths/185/projects/677/assignment"
            onClick={(e) => e.preventDefault()}
          >
            Règlement
          </a>
        </li>
      </ul>
      <div className="footer-logo-container">
        <img
          src="../images/icon-left-font-monochrome-white.png"
          alt="Logo de l'entreprise"
        />
      </div>
    </footer>
  );
};

export default Footer;
