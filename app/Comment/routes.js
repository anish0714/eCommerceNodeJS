const router = require("express").Router();
const commentController = require("./controller");
const auth = require("../../middleware/auth");

router.post("/", auth, commentController.postCommentOnProduct);
router.post("/getAllComments", auth, commentController.getAllComments);
router.get("/:id", auth, commentController.getCommentById);
router.put("/:id", commentController.updateComment);

module.exports = router;
