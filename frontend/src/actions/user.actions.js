import axios from "axios";
export const GET_USER = "GET_USER";
export const UPLOAD_AVATAR = "UPLOAD_AVATAR";
export const UPDATE_BIO = "UPDATE_BIO";
export const UPDATE_USERNAME = "UPDATE_USERNAME";
export const UPLOAD_ERRORS = "UPLOAD_ERRORS";
export const UPLOAD_AVATAR_ERRORS = "UPLOAD_AVATAR_ERRORS";
export const UPDATE_BIO_ERRORS = "UPDATE_BIO_ERRORS";
export const UPDATE_USERNAME_ERRORS = "UPDATE_USERNAME_ERRORS";
//Obtenir un user
export const getUser = (uId) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/user/${uId}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch({ type: GET_USER, payload: res.data });
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert(error.response.data.message);
      }
      if (error.response.status === 401) {
        localStorage.clear();
        window.location = "/";
      }
    }
  };
};
//Mettre à jour la photo de profil
export const updateAvatar = (data, id) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/user/update/avatar/${id}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data,
      });
      const res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch({ type: UPLOAD_AVATAR, payload: res.data.avatar });
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert(error.response.data.message);
      }
      if (error.response.status === 401) {
        localStorage.clear();
        window.location = "/";
      }
    }
  };
};
//Mettre à jour la bio
export const updateBio = (bio, id) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/user/update/bio/${id}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { bio },
      });
      dispatch({ type: UPDATE_BIO, payload: bio });
    } catch (error) {
      console.log(error);
      if (error.response.data.bio) {
        alert(error.response.data.bio.msg);
      } else if (error.response.data.message) {
        alert(error.response.data.message);
      } else if (error.response.status === 401) {
        localStorage.clear();
        window.location = "/";
      }
    }
  };
};
//Mettre à jour l'username
export const updateUsername = (username, password, id) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/user/update/username/${id}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { username, password },
      });
      dispatch({ type: UPDATE_USERNAME, payload: username });
    } catch (error) {
      console.log(error);
      if (error.response.data.username) {
        alert(error.response.data.username.msg);
      } else if (error.response.data.message) {
        alert(error.response.data.message);
      } else if (error.response.status === 401) {
        localStorage.clear();
        window.location = "/";
      }
    }
  };
};
