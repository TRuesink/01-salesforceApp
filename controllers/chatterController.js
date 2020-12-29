const jsforce = require("jsforce");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc get group chatter feed
// @route GET /api/v1/chatter/:id
// @access Private
exports.getChatter = asyncHandler(async (req, res, next) => {
  const conn = new jsforce.Connection({
    instanceUrl: req.session.auth.instanceUrl,
    accessToken: req.session.auth.accessToken,
  });

  const chatter = await conn.chatter
    .resource(`/feeds/record/${req.params.id}/feed-elements`)
    .retrieve();

  res.status(200).json({
    success: true,
    count: chatter.elements.length,
    data: chatter,
  });
});

// @desc create a feed item for specific post
// @route POST /api/v1/chatter/post/:feedElementType/:subjectId
// @access Private
exports.createFeedItem = asyncHandler(async (req, res, next) => {
  const conn = new jsforce.Connection({
    instanceUrl: req.session.auth.instanceUrl,
    accessToken: req.session.auth.accessToken,
  });
  console.log(req.params);
  const chatter = await conn.chatter.resource(`/feed-elements`).create({
    body: req.body,
    feedElementType: req.params.feedElementType,
    subjectId: req.params.subjectId,
  });

  res.status(200).json({
    success: true,
    data: chatter,
  });
});

// @desc create a comment for specific post
// @route POST /api/v1/chatter/comment/:feedElementId
// @access Private
exports.createComment = asyncHandler(async (req, res, next) => {
  const conn = new jsforce.Connection({
    instanceUrl: req.session.auth.instanceUrl,
    accessToken: req.session.auth.accessToken,
  });
  console.log(req.params);

  const chatter = await conn.chatter
    .resource(
      `/feed-elements/${req.params.parentElementId}/capabilities/comments/items`
    )
    .create({
      body: req.body,
    });

  res.status(200).json({
    success: true,
    data: chatter,
  });
});

// @desc like a post or comment
// @route POST /api/v1/chatter/like/:feedElementId
// @access Private
exports.likeFeedElement = asyncHandler(async (req, res, next) => {
  const conn = new jsforce.Connection({
    instanceUrl: req.session.auth.instanceUrl,
    accessToken: req.session.auth.accessToken,
  });

  const chatter = await conn.chatter
    .resource(
      `/feed-elements/${req.params.parentElementId}/capabilities/chatter-likes/items`
    )
    .create("");

  res.status(200).json({
    success: true,
    data: chatter,
  });
});

// @desc delete like
// @route DELETE /api/v1/chatter/likes/:feedElementId
// @access Private
exports.deleteItem = asyncHandler(async (req, res, next) => {
  const conn = new jsforce.Connection({
    instanceUrl: req.session.auth.instanceUrl,
    accessToken: req.session.auth.accessToken,
  });

  const chatter = await conn.chatter
    .resource(`/${req.params.type}/${req.params.elementId}`)
    .delete();

  res.status(200).json({
    success: true,
    data: chatter,
  });
});

// @desc Create a group
// @route POST /api/v1/chatter/groups
// @access Private
exports.createGroup = asyncHandler(async (req, res, next) => {
  const conn = new jsforce.Connection({
    instanceUrl: req.session.auth.instanceUrl,
    accessToken: req.session.auth.accessToken,
  });

  const chatter = await conn.chatter.resource(`/groups`).create(req.body);

  res.status(200).json({
    success: true,
    data: chatter,
  });
});

// @desc Get a list of groups
// @route GET /api/v1/chatter/groups
// @access Private
exports.getGroupList = asyncHandler(async (req, res, next) => {
  const conn = new jsforce.Connection({
    instanceUrl: req.session.auth.instanceUrl,
    accessToken: req.session.auth.accessToken,
  });

  const data = await conn.chatter.resource(`/groups`).retrieve();

  res.status(200).json({
    success: true,
    count: data.groups.length,
    data: data,
  });
});
