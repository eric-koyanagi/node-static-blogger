module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define("articles", {
    title: {
      type: Sequelize.STRING
    },
    body: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    },
    created_at: {
      type: Sequelize.DATE
    },    
  }, {
    timestamps: false,
  });

  return Article;
};