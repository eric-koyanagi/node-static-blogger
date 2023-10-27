class PageBuilderInterface {
  constructor() {
    if(!this.setContent) {
      throw new Error("Page builders must have a setContent method");
    }
    if(!this.buildPage) {
      throw new Error("Page builders must have a buildPage method");
    }    
  }
}
module.exports = PageBuilderInterface