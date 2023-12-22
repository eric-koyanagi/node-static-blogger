const path = require('path');
const db = require("../models");
const Article = db.articles;
const middleware = require('../middleware/articleMiddleware')
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// List of articles to return as JSON
exports.article_list = asyncHandler(async (req, res, next) => {
    const data = await Article.findAll({ 
        where: {
            site: req.params.site
        },
        order: [['id', 'DESC']]     
    });
    res.json(data);
});
