const { oauth2, createConnection } = require("../services/salesforce");
const colors = require("colors");
const jsforce = require("jsforce");

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");

// @desc Initialize username / password authentication
// @route POST /api/v1/local/auth
// @access
exports.login = asyncHandler(async (req, res, next) => {
  const conn = new jsforce.Connection({
    loginUrl: "https://login.salesforce.com",
  });
  const username = req.body.username;
  const password = req.body.password;
  const securityToken = req.body.securityToken;

  await conn.login(username, password + securityToken);

  req.session.auth = {
    accessToken: conn.accessToken,
    instanceUrl: conn.instanceUrl,
  };
  const user = await conn.identity();
  const org = await conn.sobject("Organization").retrieve(user.organization_id);
  res.status(200).json({
    success: true,
    data: { ...user, orgName: org.Name },
  });
});

// @desc logout of user / session
// @route GET /api/v1/logout
// @access
exports.logout = (req, res, next) => {
  req.session = null;
  res.clearCookie();
  res.status(200).json({ success: true, data: [] });
};

// @desc get of user info
// @route GET /api/v1/user
// @access
exports.getUser = asyncHandler(async (req, res, next) => {
  const conn = new jsforce.Connection({
    instanceUrl: req.session.auth.instanceUrl,
    accessToken: req.session.auth.accessToken,
  });
  const user = await conn.identity();
  const org = await conn.sobject("Organization").retrieve(user.organization_id);
  res.status(200).json({
    success: true,
    data: { ...user, orgName: org.Name },
  });
});

// @desc get Org info
// @route GET /api/v1/org
// @access Private
exports.getOrg = asyncHandler(async (req, res, next) => {
  const conn = new jsforce.Connection({
    instanceUrl: req.session.auth.instanceUrl,
    accessToken: req.session.auth.accessToken,
  });
  const user = await conn.identity();
  const org = await conn.sobject("Organization").retrieve(user.organization_id);
  res.status(200).json({
    success: true,
    data: org,
  });
});
