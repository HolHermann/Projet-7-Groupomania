const router = require("express").Router();
const auth = require("../middleware/auth");
const postController = require("../controllers/post.controllers");
const multerPost = require("../middleware/multer_config_post");
const inputsValidation = require("../middleware/inputsValidation");

router.post(
  "/create",
  auth,
  inputsValidation.content,
  multerPost,
  postController.createPost
);
router.delete("/delete/:id", auth, postController.deletePost);
router.get("/", auth, postController.getAllPost);
router.put(
  "/update/:id",
  auth,
  inputsValidation.content,
  multerPost,
  postController.updatePost
);
router.put("/update/pic/:id", auth, multerPost, postController.updatePostPic);
router.get("/:userId", auth, postController.getAllPostOfOneUser);

module.exports = router;
