const router = require("express").Router();
const auth = require("../middleware/auth");
const postController = require("../controllers/post.controllers");
const multerPost = require("../middleware/multer_config_post");
const inputsValidation = require("../middleware/inputsValidation");
// Créer un post
router.post(
  "/create",
  auth,
  inputsValidation.content,
  multerPost,
  postController.createPost
);
//Supprimer in post
router.delete("/delete/:id", auth, postController.deletePost);
//Supprimer une photo d'un post
router.delete("/delete/pic/:id", auth, postController.deletePostPic);
//Obtenir tous les posts
router.get("/", auth, postController.getAllPost);
//Modifier un post
router.put(
  "/update/:id",
  auth,
  inputsValidation.content,
  multerPost,
  postController.updatePost
);
//Modifier la photo d'un post
router.put("/update/pic/:id", auth, multerPost, postController.updatePostPic);
//Obtenir tous les posts d'un utilisateurs
router.get("/:userId", auth, postController.getAllPostOfOneUser);

module.exports = router;
