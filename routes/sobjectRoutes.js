const express = require("express");

// Bring in Controllers
const {
  getSobjects,
  getSobject,
  updateSobject,
  deleteSobject,
  createSobject,
  getMetaData,
  getSearchData,
} = require("../controllers/sobjectController");

// bring in authentication middlewares
const { authorized } = require("../middlewares/auth");
const advancedResults = require("../middlewares/advancedResults");

const router = express.Router();
router.route("/search/:type").get(authorized, getSearchData);
router.route("/metadata/:type").get(authorized, getMetaData);
router
  .route("/:type")
  .get(authorized, advancedResults, getSobjects)
  .post(authorized, createSobject);
router
  .route("/:type/:id")
  .get(authorized, getSobject)
  .put(authorized, updateSobject)
  .delete(authorized, deleteSobject);

module.exports = router;
