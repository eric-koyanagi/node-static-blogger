const path = require('path');
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
    const data = await Article.findByPk(req.params.id, {include: ['previousArticle', 'nextArticle']});    
    res.render("./rendered-article/article", { title: data.title, article: data, previousArticle: data?.previousArticle, nextArticle: data?.nextArticle });
});

// Article index preview (rendered preview)
exports.article_index_preview = asyncHandler(async (req, res, next) => {
    res.render("./rendered-index/index", { title: "Article Index", articles: await Article.findAll() });
});

// Article create / update form
exports.article_create_get = asyncHandler(async (req, res, next) => {
    const data = (req.params.id) ? await Article.findByPk(req.params.id, {include: ['previousArticle', 'nextArticle']}) : null;
    const links = await Article.getPossibleLinks(req.params.id || 0);

    res.render("articleForm", { 
        title: "Create or Edit Article", 
        article: data, 
        articleList: links,
    });
});

// Article create / update action
exports.article_create_post = [

    // validation and santization is done via express-validator middleware
    body("title", "Title must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("body", "Content must contain at least 100 characters")
        .trim()
        .isLength({ min: 100 }),
    body("author", "Author can't be blank")
        .notEmpty()
        .trim()
        .escape(),

    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request and either create/update or re-render the form with errors
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const article = await Article.upsert({
                title: req.body.title,
                body: req.body.body,
                author: req.body.author,
                published: req.body.published,
                nextId: req.body.next,
                previousId: req.body.previous,
            }, [{id: req.body.id}])

            await article.publish();    

            res.render("articleForm", { title: "Create or Edit Article", article: article, saved: true, articleList: await Article.getPossibleLinks(req.body.id) });
        } else {            
            res.render("articleForm", { title: "Create or Edit Article", article: req.body, errors: errors, articleList: await Article.getPossibleLinks(req.body.id) });
        }
    })
];

// Article delete confirmation form
exports.article_delete_get = asyncHandler(async (req, res, next) => {
    const data = (req.params.id) ? await Article.findByPk(req.params.id) : null;
    res.render("articleDeleteConfirmation", { article: data })
});

// Article delete action
exports.article_delete_post = asyncHandler(async (req, res, next) => {
    if (req.body.confirm) {
        const data = (req.params.id) ? await Article.findByPk(req.params.id) : null;
        await article.delete();
        res.send("Article deleted");
    } else {
        res.send("Article not deleted (confirmation box not checked)");
    }    
});

// Article rebuild all action (this is done synchronously due to API limits, with a "sleep" between API calls; to improve, implement an exponential backup)
exports.article_rebuild_all_get = asyncHandler(async (req, res, next) => {    
    const articles = await Article.findAll({include: ['previousArticle', 'nextArticle']});
    var promises = [];
    for await (const article of articles) {
        await Promise.all([
            article.publish(),
            new Promise(resolve => { setTimeout(resolve, 500); })
        ]);
    };
  
    res.send("Everything is done rebuilding...");
});