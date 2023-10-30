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
    res.render("articlePreview", { title: data.title, article: data });
});

// Article create / update form
exports.article_create_get = asyncHandler(async (req, res, next) => {
    const data = (req.params.id) ? await Article.findByPk(req.params.id, {include: ['previousArticle', 'nextArticle']}) : null;

    console.log("Data obtained for article is ", data)
    const links = await Article.getPossibleLinks(req.params.id)

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

// Article delete action
exports.article_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Article delete POST");
});

// Article rebuilt all action
exports.article_rebuild_all_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Article rebuild");
});