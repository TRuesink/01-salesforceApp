const express = require("express");

// Bring in Controllers
const { getMetadata } = require("../controllers/metadataController");

// bring in authentication middlewares
const { authorized } = require("../middlewares/auth");

const router = express.Router();

router.route("/:resource").get(authorized, getMetadata);

module.exports = router;
