const db = require("../models");
const Article = db.articles;
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// List of articles for editing
// See here for more about how asyncHandler reduces boilerplate: https://www.npmjs.com/package/express-async-handler
exports.article_list = asyncHandler(async (req, res, next) => {
    const data = await Article.findAll({ order: [['id', 'DESC']] });
    res.render("index", { title: "Articles", articles: data });
});

// Article detail (rendered preview)
exports.article_preview = asyncHandler(async (req, res, next) => {
    const data = await Article.findByPk(req.params.id);
    res.render("articlePreview", { title: data.title, article: data });
});

// Article create / update form
exports.article_create_get = asyncHandler(async (req, res, next) => {
    const data = (req.params.id) ? await Article.findByPk(req.params.id) : null;
    res.render("articleForm", { title: "Create or Edit Article", article: data });
});

exports.article_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Article update GET");
});

// Article create / update action
exports.article_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Article create POST");
    //res.render("articleForm", { title: "Create or Edit Article", article: data, errors: [] });
});

// Article delete action
exports.article_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Article delete POST");
});

// Article rebuilt all action
exports.article_rebuild_all_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Article rebuild");
});