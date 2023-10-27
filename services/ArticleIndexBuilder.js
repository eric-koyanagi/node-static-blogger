const PageBuilderInterface = require('../interfaces/PageBuilderInterface');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3"); 
var path = require('path');
const express = require('express')

class ArticleIndexBuilder extends PageBuilderInterface {
  setLayout() {
    this.layout = 'layout-article-index';
  }

  async setContent(Article) 
  {  
    this.data = await Article.findAll({ order: [['id', 'DESC']] })
  }

  buildPage(publisher) 
  {
    var appInstance = express();
    appInstance.set('views', [path.join(__dirname, '../views/rendered-index'), ]); 
    appInstance.set('view engine', 'pug'); 

    appInstance.render("index", { articles: this.data }, (err, html) => {
      if (err) {
        console.log("Render error", err)
      }
      
      publisher.publish("index.html", html)
    });
  }
}
module.exports = new ArticleIndexBuilder()
