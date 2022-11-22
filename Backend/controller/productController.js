const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncErrors');
const ApiFeature = require('../utils/apiFeatures');




// create  product
exports.createProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product
  });
});


//get all product
exports.getAllProducts = catchAsyncError(async (req, res, next) => {

  // const products = await Product.find();
  const resultPerPage = 5;
  const apiFeature = new ApiFeature(Product.find(), req.query).search().filter().pagination(resultPerPage);
  const products = await apiFeature.query;
  const matched = products.length;
  const totalProductItems = await Product.countDocuments();

  res.status(200).json({
    success: true,
    totalProductItems,
    matched,
    resultPerPage,
    products,
  });

});

//get a single product 
exports.getAllProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  res.status(200).json({
    success: true,
    product
  });

});


//update product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });
  res.status(200).json({
    success: true,
    product  //modifyed product
  });
});


//delete product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  await product.remove();
  res.status(200).json({
    success: true,
    "message": "Product delete successfully"
  });
});





