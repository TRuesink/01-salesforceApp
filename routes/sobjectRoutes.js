const express = require("express");

// Bring in Controllers
const {
  getSobjects,
  getSobject,
  updateSobject,
  deleteSobject,
  createSobject,
  getMetaData,
} = require("../controllers/sobjectController");

// bring in authentication middlewares
const { authorized } = require("../middlewares/auth");
const advancedResults = require("../middlewares/advancedResults");

const router = express.Router();
router.route("/metadata/:type").get(authorized, getMetaData);
router
  .route("/:type")
  .get(advancedResults, authorized, getSobjects)
  .post(authorized, createSobject);
router
  .route("/:type/:id")
  .get(authorized, getSobject)
  .put(authorized, updateSobject)
  .delete(authorized, deleteSobject);

module.exports = router;
