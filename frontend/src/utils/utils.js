export const isEmpty = (value) => {
  // vérfication que value n'est pas vide
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};
export const onUploadLabel = (e) => {
  const keyCode = e.which || e.keyCode;
  if (keyCode === 13) {
    e.target.click();
  }
};
// obtenir le token grâce au localstorage
export const getToken = () => {
  return localStorage.getItem("token");
};
