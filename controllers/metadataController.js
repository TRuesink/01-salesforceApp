const jsforce = require("jsforce");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc get metadata for specific resource
// @route GET /api/v1/sobjects/metadata/:resource
// @access Private
exports.getMetadata = asyncHandler(async (req, res, next) => {
  const conn = new jsforce.Connection({
    instanceUrl: req.session.auth.instanceUrl,
    accessToken: req.session.auth.accessToken,
  });

  const types = [{ type: req.params.resource, folder: null }];
  const metadataList = await conn.metadata.list(types, "39.0");
  // const allMetadata = await conn.metadata.describe("39.0");
  // for (var i = 0; i < allMetadata.length; i++) {
  //   var meta = metadata[i];
  //   console.log("organizationNamespace: " + meta.organizationNamespace);
  //   console.log("partialSaveAllowed: " + meta.partialSaveAllowed);
  //   console.log("testRequired: " + meta.testRequired);
  //   console.log("metadataObjects count: " + metadataObjects.length);
  // }

  if (!metadataList) {
    return res.status(200).json({
      success: true,
      data: {},
    });
  }

  const fullNames = metadataList.map((item) => item.fullName);
  const metadata = await conn.metadata.read(req.params.resource, fullNames);
  res.status(200).json({
    success: true,
    data: metadata,
  });
});
