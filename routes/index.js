var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// Require controllers
const article_controller = require("../controllers/articleController");

// Article Routes

// Article list (HP)
router.get("/", article_controller.article_list);

// GET + POST for article creation
router.get("/article/create", article_controller.article_create_get);
router.post("/article/create", article_controller.article_create_post);

// GET for article update
//router.get("/article/edit/:id", article_controller.article_detail);

// POST request to delete
router.post("/article/delete/:id", article_controller.article_delete_post);

// GET request to render an article for preview
router.get("/article/view/:id", article_controller.article_preview);

// TODO: add other controller routes here, or separate them into different files if this becomes too lengthy

module.exports = router;
