const db = require("../models");
const Article = db.articles;
const Author = db.authors;
const asyncHandler = require("express-async-handler");

const loadFormData = asyncHandler(async (req, res, next) => {
  const links = await Article.getPossibleLinks(req.params.id || 0);
  const authors = await Author.findAll();

  res.locals.links = links;
  res.locals.authors = authors;

  // call next middleware
  next();
});

module.exports = {
  loadFormData,
};