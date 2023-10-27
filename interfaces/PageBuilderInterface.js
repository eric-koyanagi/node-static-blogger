class PageBuilderInterface {
  constructor() {
    if(!this.setData) {
      throw new Error("Page builders must have a setData method");
    }    
  }
}