const path = require('path');
const db = require("../models");
const Author = db.authors;
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// List of authors
exports.author_list = asyncHandler(async (req, res, next) => {
    const data = await Author.findAll({ order: [['id', 'DESC']] });
    res.render("authors", { title: "Authors", authors: data });
});

exports.author_create_get = asyncHandler(async (req, res, next) => {
    const data = (req.params.id) ? await Author.findByPk(req.params.id) : null;  

    res.render("authorForm", { 
        title: "Create or Edit Author", 
        author: data, 
    });
});

// Article create / update action
exports.author_create_post = [

    // validation and santization is done via express-validator middleware
    body("first_name", "Name must contain at least 2 characters")
        .trim()
        .isLength({ min: 2 })
        .escape(),
    body("last_name", "Name must contain at least 2 characters")
        .trim()
        .isLength({ min: 2 })
        .escape(), 
    body("body", "Content must contain at least 100 characters")
        .trim()
        .isLength({ min: 100 }),

    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request and either create/update or re-render the form with errors
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const author = await Author.upsert({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                about: req.body.body,
                linkedin: req.body.linkedin,
                github: req.body.github,
            }, [{id: req.body.id}])

            //await article.publish();

            res.render("authorForm", { title: "Create or Edit Author", author: author, saved: true });
        } else {        
            res.render("authorForm", { title: "Create or Edit Author", author: req.body, errors: errors });
        }
    })
];