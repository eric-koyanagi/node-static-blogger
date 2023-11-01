const path = require('path');
const db = require("../models");
const Article = db.articles;
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// List of authors
exports.author_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: author list GET");
});

