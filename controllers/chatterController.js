const jsforce = require("jsforce");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc Retrieve sobjects specified in request
// @route GET /api/v1/sobjects/:type
// @access Private
exports.getChatter = asyncHandler(async (req, res, next) => {
  const conn = new jsforce.Connection({
    instanceUrl: req.session.auth.instanceUrl,
    accessToken: req.session.auth.accessToken,
  });

  const chatter = await conn.chatter
    .resource("/feeds/record/0064x000003xzaZAAQ/feed-elements")
    .retrieve();

  res.status(200).json({
    success: true,
    data: chatter,
  });
});
