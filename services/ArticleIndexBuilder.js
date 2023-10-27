const PageBuilderInterface = require('../interfaces/PageBuilderInterface');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3"); 

const db = require("../models");
const Article = db.articles;

class ArticleIndexBuilder extends PageBuilderInterface {
  setLayout() {
    this.layout = 'article-index-layout';
  }

  async setContent() 
  {  
    this.data = await Article.findAll({ order: [['id', 'DESC']] })
  }

  buildPage() 
  {

  }
}
module.exports = ArticleIndexBuilder
