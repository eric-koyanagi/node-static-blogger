var express = require('express');
var router = express.Router();

// API Routes
const api_controller = require("../controllers/apiController");

// GET list of articles for a given site
router.get("/articles/:site", api_controller.article_list);

// GET details for an article
//router.get("/article/:id", api_controller.article_detail);

module.exports = router;
