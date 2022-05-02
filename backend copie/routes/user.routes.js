const router = require("express").Router();
const auth = require("../middleware/auth");
const authController = require("../controllers/user.controllers");
const inputsValidation = require("../middleware/inputsValidation");
const multer_avatar = require("../middleware/multer_ProfilPic");

router.post(
  "/register",
  inputsValidation.username,
  inputsValidation.email,
  inputsValidation.password,
  inputsValidation.bio,
  authController.signUp
);
router.post(
  "/login",
  inputsValidation.email,
  inputsValidation.password,
  authController.signIn
);
router.put(
  "/update/username/:id",
  auth,
  inputsValidation.username,
  inputsValidation.password,
  authController.updateUser
);
router.put(
  "/update/bio/:id",
  auth,
  inputsValidation.bio,
  authController.updateBio
);
router.put(
  "/update/avatar/:id",
  auth,
  multer_avatar,
  authController.updateAvatar
);
router.get("/:id", auth, authController.getOneUser);
router.get("/", auth, authController.getAllUsers);
router.delete("/delete/:id", auth, authController.deleteUser);

module.exports = router;
