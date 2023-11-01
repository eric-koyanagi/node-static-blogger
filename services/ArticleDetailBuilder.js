const PageBuilderInterface = require('../interfaces/PageBuilderInterface');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3"); 
var path = require('path');
const express = require('express')

class ArticleDetailBuilder extends PageBuilderInterface {
  async setContent(data) 
  {  
    this.data = data;
    this.nextArticle = await this.data.getNextArticle()
    this.previousArticle = await this.data.getPreviousArticle()
  }

  buildPage(publisher) 
  {
    var appInstance = express();
    appInstance.set('views', [path.join(__dirname, '../views/rendered-article'), ]); 
    appInstance.set('view engine', 'pug'); 

    appInstance.render("article", { article: this.data, nextArticle: this?.nextArticle?.dataValues, previousArticle: this?.previousArticle?.dataValues }, (err, html) => {
      if (err) {
        throw new Error(err)
      }

      publisher.publish(this.data.slug, html)
    });
  }
}
module.exports = new ArticleDetailBuilder()
