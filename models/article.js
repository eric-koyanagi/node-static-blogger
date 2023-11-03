module.exports = (sequelize, Sequelize) => {
  const moment = require('moment');
  const { Op } = require("sequelize");
  const db = require("../models/index");  

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
        next_id: {
          type: Sequelize.INTEGER
        },
        previous_id: {
          type: Sequelize.INTEGER,         
        },
        published: {
          type: Sequelize.BOOLEAN
        },
    }, 
    {
        underscored: true,
    }
  );

  //console.log("Author is ", db.authors, db)

  // Associations
  Article.belongsTo(Article, { foreignKey: 'next_id', as: 'nextArticle' });
  Article.belongsTo(Article, { foreignKey: 'previous_id', as: 'previousArticle' }); 
  //Article.hasOne(Author)

  // Class methods

  // rebuilds article list pages
  Article.rebuildIndex = async function() {
      this.indexBuilder.setContent()
      await publisher.publish("index.html", this.indexBuilder.buildPage())
  }

  // either update an existing article with these values, or make a new one
  Article.upsert = function(values, condition) {
    return Article
      .findOne({ where: condition })
      .then(function(obj) {
          if(obj)
            return obj.update(values);

          return Model.create(values);
      })
  };

  // get all possible next/previous links (all article except the selected one)
  Article.getPossibleLinks = async function(id) {
    return Article.findAll({
      where: {
        id: {
          [Op.ne]: id
        }
      }
    })
  };

  // Instance methods

  // get a formatted publish date (could do this client side too)
  Article.prototype.getPublishedDate = function() {
      return moment(this.createdAt).format('MM/D/YY');
  };

  // publish the article, building a static page and sending it to a data store (S3)
  Article.prototype.publish = async function() {
      await pageBuilder.setContent(this)
      await indexBuilder.setContent(Article)

      indexBuilder.buildPage(publisher);
      pageBuilder.buildPage(publisher);
  };

  // because sequalize is stupid and does not tell you about reserved words for columns! Really silly...
  Article.prototype.getPreviousId = function() {
      return this.previous;
  }

  return Article;
};