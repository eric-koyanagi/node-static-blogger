const db = require("../models");
const Article = db.articles;
const asyncHandler = require("express-async-handler");

// List of articles for editing
exports.article_list = asyncHandler(async (req, res, next) => {
    Article.findAll({ order: [['id', 'DESC']] })
        .then(data => {
            res.render("index", {
                title: "Article Index",
                articles: data,
              });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving articles."
            });
        });
});

// Article detail (rendered preview)
exports.article_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Article detail: ${req.params.id}`);
});

// Article create / update form
exports.article_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: AutArticlehor create GET");
});

exports.article_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Article update GET");
});

// Article create / update action
exports.article_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Article create POST");
});

// Article delete action
exports.article_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Article delete POST");
});

// Article rebuilt all action
exports.article_rebuild_all_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Article rebuild");
});