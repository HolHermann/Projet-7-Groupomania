import React, { useContext, useState } from "react";
import { loginContext } from "../components/AppContext";

import ProfilUser from "../components/profil/ProfilUser";
import UpdateProfil from "../components/profil/UpdateProfil";
// page pour la modification du profil
const Profil = () => {
  const [profilModal, setProfilModal] = useState(true);
  const [updateModal, setUpdateModal] = useState(false);
  const uId = useContext(loginContext);
  const handleModals = (e) => {
    if (e.target.id === "profil") {
      setProfilModal(true);
      setUpdateModal(false);
    } else if (e.target.id === "updateProfil") {
      setProfilModal(false);
      setUpdateModal(true);
    }
  };
  return (
    <div className="profil-page">
      <ul className={updateModal ? "options-profil-update" : "options-profil"}>
        {uId ? ( // si l'user est connecté
          <>
            <li
              onClick={handleModals}
              id="profil"
              tabIndex={0}
              onKeyPress={handleModals}
              className={profilModal ? "hidden" : null}
            >
              Retourner sur le profil
            </li>
            <li
              tabIndex={0}
              onKeyPress={handleModals}
              onClick={handleModals}
              id="updateProfil"
              className={updateModal ? "hidden" : null}
            >
              Mettre à jour le profil
            </li>
          </>
        ) : null}
      </ul>
      {profilModal && <ProfilUser />}
      {updateModal && <UpdateProfil />}
    </div>
  );
};

export default Profil;
