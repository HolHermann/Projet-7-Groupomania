const router = require("express").Router();
const auth = require("../middleware/auth");
const commentController = require("../controllers/comment.controllers");
const inputsValidation = require("../middleware/inputsValidation");

router.post(
  "/create/:postId",
  auth,
  inputsValidation.contentComment,
  commentController.createComment
);
router.put(
  "/update/:id",
  auth,
  inputsValidation.contentComment,
  commentController.updateComment
);
router.get("/:postId", auth, commentController.getAllCommentsAboutPost);
router.delete("/delete/:id", auth, commentController.deleteComment);
module.exports = router;
