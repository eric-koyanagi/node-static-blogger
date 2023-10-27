class PageBuilderInterface {
  constructor() {
    if(!this.setLayout) {
      throw new Error("Page builders must have a setLayout method");
    }  
    if(!this.setContent) {
      throw new Error("Page builders must have a setContent method");
    }
    if(!this.buildPage) {
      throw new Error("Page builders must have a buildPage method");
    }    
  }
}
module.exports = PageBuilderInterface