import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar } from "../../actions/user.actions";
import { onUploadLabel } from "../../utils/utils";
const UploadAvatar = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const cancel = () => {
    setFile("");
    document.querySelector(".profil-picture").src = userData.avatar;
  };
  const handleAvatar = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", file);
    dispatch(updateAvatar(data, userData.id)); // mise à jour de la photo de profil
    setFile("");
  };
  return (
    <form action="" onSubmit={handleAvatar} className="upload-avatar">
      <label tabIndex={0} onKeyPress={onUploadLabel} htmlFor="image">
        Changer la photo de profil
      </label>
      <input
        className="hidden"
        type="file"
        name="image"
        id="image"
        accept=".jpg, .jpeg, .png, .gif"
        onChange={(e) => {
          if (e.target.files[0].size > 3670016)
            return alert("Fichier trop volumineux");
          document.querySelector(".profil-picture").src = URL.createObjectURL(
            e.target.files[0]
          );
          setFile(e.target.files[0]);
        }}
      />
      {file ? ( // si on a un fichier
        <>
          <input type="submit" value="Valider" />
          <button onClick={cancel}>Annuler</button>
        </>
      ) : null}
    </form>
  );
};

export default UploadAvatar;
