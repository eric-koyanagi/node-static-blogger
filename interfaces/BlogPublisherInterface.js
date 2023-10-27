class BlogPublisherInterface {
  constructor() {
    if(!this.publish) {
      throw new Error("Blog publishers must have a publish method");
    }
  }
}
module.exports = BlogPublisherInterface