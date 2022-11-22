const express = require('express');
const { createProduct,
       getAllProducts,
       getAllProductDetails,
       updateProduct,
       deleteProduct,
      } = require('../controller/productController');

const productRouter = express.Router();


productRouter.route('/product/new').post(createProduct);
productRouter.route('/products').get(getAllProducts);
productRouter.route('/product/:id').get(getAllProductDetails).put(updateProduct).delete(deleteProduct);

module.exports = productRouter; 