class BlogPublisherInterface {
  constructor() {
    if(!this.publish) {
      throw new Error("Blog publishers must have a publish method");
    }
    if(!this.pageBuilder) {
      throw new Error("Blog publishers must have a pageBuilder property");
    }
  }
}