module.exports = (sequelize, Sequelize) => {
  const moment = require('moment');
  const Article = sequelize.define("articles", {
        title: {
          type: Sequelize.STRING
        },
        body: {
          type: Sequelize.STRING
        },
        author: {
          type: Sequelize.STRING
        },
        slug: {
          type: Sequelize.STRING
        },
        next: {
          type: Sequelize.INTEGER
        },
        previous: {
          type: Sequelize.INTEGER
        },
        published: {
          type: Sequelize.BOOLEAN
        },
    }, 
    {
        underscored: true,
    }
  );

  Article.prototype.getPublishedDate = function() {
      return moment(this.createdAt).format('MM/D/YY');
  };

  return Article;
};