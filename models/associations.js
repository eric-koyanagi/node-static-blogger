function applyAssociations(db) {
  const Article = db.articles;
  const Author = db.authors;

  Author.hasOne(Article, {
    foreignKey: 'author_id'
  });

  Article.belongsTo(Author);
}

module.exports = { applyAssociations };