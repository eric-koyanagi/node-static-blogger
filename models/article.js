module.exports = (sequelize, Sequelize) => {
  const moment = require('moment');

  const publisher = require('../services/S3Publisher');
  const pageBuilder = require('../services/ArticleDetailBuilder');
  const indexBuilder = require('../services/ArticleIndexBuilder');

  const Article = sequelize.define("articles", {
        title: {
          type: Sequelize.STRING
        },
        body: {
          type: Sequelize.TEXT
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

  Article.prototype.publish = async function() {
      pageBuilder.setContent(this)
      await indexBuilder.setContent(Article)

      indexBuilder.buildPage(publisher);
      pageBuilder.buildPage(publisher);
  };

  Article.rebuildIndex = async function() {
      this.indexBuilder.setContent()
      await publisher.publish("index.html", this.indexBuilder.buildPage())
  }

  Article.upsert = function(values, condition) {    
    return Article
      .findOne({ where: condition })
      .then(function(obj) {
          if(obj)
            return obj.update(values);

          return Model.create(values);
      })    
  };

  return Article;
};