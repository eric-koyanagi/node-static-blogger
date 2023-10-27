var express = require('express');
var router = express.Router();

// Article Routes
const article_controller = require("../controllers/articleController");

// Article list (HP)
router.get("/", article_controller.article_list);

// GET + POST for article creation
router.get("/article/create", article_controller.article_create_get);
router.post("/article/create", article_controller.article_create_post);

// GET + POST for article update (uses same methods as creation)
router.get("/article/edit/:id", article_controller.article_create_get);
router.post("/article/edit/:id", article_controller.article_create_post);

// POST request to delete
router.post("/article/delete/:id", article_controller.article_delete_post);

// GET request to render an article for preview
router.get("/article/view/:id", article_controller.article_preview);

// @TODO: add other controller routes here, or separate them into different files if this becomes too lengthy

module.exports = router;
