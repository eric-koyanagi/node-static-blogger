const BlogPublisherInterface = require('../interfaces/BlogPublisherInterface');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3"); 

class S3Publisher extends BlogPublisherInterface {
  async publish(fileName, content) 
  {  
    const client = new S3Client({ region: 'us-east-1' });
    const input = {
      Body: content,
      Bucket: process.env.AWS_BUCKET, 
      Key: fileName,
      ContentType: 'text/html',
    };

    const command = new PutObjectCommand(input);
    return await client.send(command);
  }
}
module.exports = new S3Publisher()