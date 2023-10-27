const PageBuilderInterface = require('../interfaces/PageBuilderInterface');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3"); 

class ArticleDetailBuilder extends PageBuilderInterface {
  setLayout() {
    this.layout = 'article-layout';
  }

  setContent(data) 
  {  
    this.data = data;
  }

  buildPage() 
  {

  }
}
module.exports = ArticleDetailBuilder
