const mongoose = require('mongoose');

const productschema = new mongoose.Schema({  //create a new schema
  name: {
    type: String, // type keyword specific which type your name schema like : string,number etc
    required: [true, "Please Enter your product name"],
    trim: true,  //trim schema trim white space.
  },
  description: {
    type: String,
    required: [true, "Please Enter your product description"],
    trim: true
  },
  price: {
    type: Number,
    required: [true, "Please Enter your product price"],
    maxLength: [8, "Price cannot exced 8 charactors."] //Number, creates a validator that checks if the value length is not greater than the given number
  },
  ratings: {
    type: Number,
    default: 0 //You can also set the default schema option to a function.
  },
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  category: {
    type: String,
    required: [true, "Please Enter your product catagory"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter your product stock"],
    maxLength: [4, "stock cannot exced 4 charactors"],
    default: 1
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {

      // user: {
      //   type: mongoose.Schema.ObjectId,
      //   // ref: "user",
      //   required: true
      // },
      name: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      comment: {
        type: String,
        required: true
      }
    }
  ],
  // user: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "User",
  //   required: true
  // },
  createAt: {
    type: Date,
    default: Date.now
  }
});

const productModel = new mongoose.model("product", productschema);

module.exports = productModel;