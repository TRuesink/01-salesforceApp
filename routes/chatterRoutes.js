const express = require("express");

const { getChatter } = require("../controllers/chatterController");

const { authorized } = require("../middlewares/auth");

const router = express.Router();

router.route("/").get(authorized, getChatter);

module.exports = router;
