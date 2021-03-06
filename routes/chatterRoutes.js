const express = require("express");

const {
  getChatter,
  createFeedItem,
  createComment,
  likeFeedElement,
  deleteItem,
  createGroup,
  getGroupList,
} = require("../controllers/chatterController");

const { authorized } = require("../middlewares/auth");

const router = express.Router();

router.route("/groups/:id").get(authorized, getChatter);

// create group
router
  .route("/groups")
  .post(authorized, createGroup)
  .get(authorized, getGroupList);
// create comment
router.route("/comments/:parentElementId").post(authorized, createComment);
// create like
router.route("/likes/:parentElementId").post(authorized, likeFeedElement);
// create post
router
  .route("/posts/:feedElementType/:subjectId")
  .post(authorized, createFeedItem);

// delete itesm
router.route("/:type/:elementId").delete(authorized, deleteItem);

module.exports = router;
