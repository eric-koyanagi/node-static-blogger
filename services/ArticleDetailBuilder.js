const PageBuilderInterface = require('../interfaces/PageBuilderInterface');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3"); 
var path = require('path');
const express = require('express')

class ArticleDetailBuilder extends PageBuilderInterface {
  setLayout() {
    this.layout = 'layout-article';
  }

  async setContent(data) 
  {  
    this.data = data;
  }

  buildPage(publisher) 
  {
    var appInstance = express();
    appInstance.set('views', [path.join(__dirname, '../views/rendered-article'), ]); 
    appInstance.set('view engine', 'pug'); 

    appInstance.render("article", { article: this.data }, (err, html) => {
      if (err) {
        console.log("Render error", err)
      }

      publisher.publish(this.data.slug, html)
    });
  }
}
module.exports = new ArticleDetailBuilder()
