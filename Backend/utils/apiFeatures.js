class ApiFeature {
  constructor(query, queryFeature) {
    this.query = query;
    this.queryFeature = queryFeature;
  }
  //search product
  search() {
    const keyword = this.queryFeature.keyword ? { // //keyword : jo user input krega product ko search karte time.
      name: {
        $regex: this.queryFeature.keyword,
        $options: "i" // for the case cencitive
      }
    } : {}  //agr user ko koi product nahi mila to 
    this.query = this.query.find({ ...keyword });
    return this;
    console.log(this.queryFeature)
  };

  //filter product by its price
  filter() {

    //create a of queryFeature
    const queryCopy = { ...this.queryFeature };

    //removing some fields for catagory
    const removeField = ["keyword", "page", "limit"];

    removeField.forEach(field => delete queryCopy[field]);

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)
    console.log(queryStr)
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }


  //pagination
  pagination(resultPerPage) {
    const currentPage = Number(this.queryFeature.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this
  }
}

module.exports = ApiFeature;