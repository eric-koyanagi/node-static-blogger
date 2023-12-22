const BlogPublisherInterface = require('../interfaces/BlogPublisherInterface');
const fs = require('fs');

class LocalPublisher extends BlogPublisherInterface {
  async publish(fileName, content) 
  {  
    fs.writeFile(filename, content, (err) => {
        if (err) {
            console.error(err);
            return false;
        } else {
            console.log('File written successfully');
            return true;
        }
    });
  }
}
module.exports = new LocalPublisher()