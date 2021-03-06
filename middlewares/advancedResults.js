const jsforce = require("jsforce");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");

const advancedResults = asyncHandler(async (req, res, next) => {
  const conn = new jsforce.Connection({
    instanceUrl: req.session.auth.instanceUrl,
    accessToken: req.session.auth.accessToken,
  });

  let query = { ...req.query };

  // fields to exclude
  const removeFields = ["select", "sort", "page", "limit", "sobject"];

  //remove identified fields from parms obejct on request
  removeFields.forEach((param) => delete query[param]);

  // Select Fields
  let fields;
  if (req.query.select) {
    fields = req.query.select.split(",");
  }

  // Sort by
  let sort;
  if (req.query.sort) {
    sort = req.query.sort;
  } else {
    sort = "";
  }

  // sobject
  if (!req.params.type) {
    return next(
      new ErrorResponse(`There was no SObject type specified in the request`),
      400
    );
  }
  const sobject = req.params.type;

  //pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 15;

  const skip = (page - 1) * limit; // 10
  const startIndex = (page - 1) * limit; // 10
  const endIndex = page * limit; // 20
  // get toal number of objects in database
  const total = await conn.sobject(sobject).count(query);

  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  // make the request to salesforce db
  const results = await conn
    .sobject(sobject)
    .find(query, fields)
    .sort(sort)
    .offset(skip)
    .limit(limit);

  res.advancedResults = {
    success: true,
    count: total,
    pagination,
    data: results,
  };

  next();
});

module.exports = advancedResults;
