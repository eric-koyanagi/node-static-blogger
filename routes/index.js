var express = require('express');
var router = express.Router();

// Article Routes
const article_controller = require("../controllers/articleController");

// Article list and management portal (HP)
router.get("/", article_controller.article_list);

// GET + POST for article creation
router.get("/article/create", article_controller.article_create_get);
router.post("/article/create", article_controller.article_create_post);

// GET + POST for article update (uses same methods as creation)
router.get("/article/edit/:id", article_controller.article_create_get);
router.post("/article/edit/:id", article_controller.article_create_post);

// POST request to delete
router.get("/article/delete/:id", article_controller.article_delete_get);
router.post("/article/delete/:id", article_controller.article_delete_post);

// GET request to render an article for preview
router.get("/article/view/:id", article_controller.article_preview);

// GET request to rebuild all articles
router.get("/article/rebuild", article_controller.article_rebuild_all_get);

// GET request to view article index preview
router.get("/article/index-preview", article_controller.article_index_preview);

// Author Routes
const author_controller = require("../controllers/authorController");

// Author list and management portal
router.get("/author", author_controller.author_list);

module.exports = router;
