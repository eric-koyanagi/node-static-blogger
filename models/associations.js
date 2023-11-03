function applyAssociations(db) {
  const Article = db.articles;
  const Author = db.authors;

  //Article.hasOne(Author);
  //Author.belongsTo(Article);
}

module.exports = { applyAssociations };