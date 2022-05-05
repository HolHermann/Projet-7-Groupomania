const router = require("express").Router();
const auth = require("../middleware/auth");
const authController = require("../controllers/user.controllers");
const inputsValidation = require("../middleware/inputsValidation");
const multer_avatar = require("../middleware/multer_ProfilPic");
//Créer un compte
router.post(
  "/register",
  inputsValidation.username,
  inputsValidation.email,
  inputsValidation.password,
  inputsValidation.bio,
  authController.signUp
);
//Connexion au compte
router.post(
  "/login",
  inputsValidation.email,
  inputsValidation.password,
  authController.signIn
);
//Modification de l'username d'un compte
router.put(
  "/update/username/:id",
  auth,
  inputsValidation.username,
  inputsValidation.password,
  authController.updateUser
);
//Modification de la biographie d'un compte
router.put(
  "/update/bio/:id",
  auth,
  inputsValidation.bio,
  authController.updateBio
);
//Modification de l'avatar d'un compte
router.put(
  "/update/avatar/:id",
  auth,
  multer_avatar,
  authController.updateAvatar
);
//Obtenir un user
router.get("/:id", auth, authController.getOneUser);
//Obtenir tous les users
router.get("/", auth, authController.getAllUsers);
//Supprimer un compte
router.delete("/delete/:id", auth, authController.deleteUser);

module.exports = router;
