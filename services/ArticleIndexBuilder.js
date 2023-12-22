const PageBuilderInterface = require('../interfaces/PageBuilderInterface');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const sitemapBuilder = require("./SitemapBuilder") 
const path = require('path');
const express = require('express')

class ArticleIndexBuilder extends PageBuilderInterface {
  async setContent(Article) 
  {  
    this.data = await Article.findAll({ 
      site: process.env.PUBLISHED_SITE,
      order: [['id', 'DESC']]
    })
  }

  buildPage(publisher) 
  {
    var appInstance = express();
    appInstance.set('views', [path.join(__dirname, '../views/rendered-index'), ]); 
    appInstance.set('view engine', 'pug'); 

    // create and upload the rendered page
    appInstance.render("index", { articles: this.data }, (err, html) => {
      if (err) {
        console.log("Render error", err)
      }

      publisher.publish("index.html", html)
    });

    // refresh the sitemap
    sitemapBuilder.buildSitemap(this.data, publisher);
  }
}
module.exports = new ArticleIndexBuilder()
