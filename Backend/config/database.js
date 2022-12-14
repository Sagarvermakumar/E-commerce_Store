

const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    const connection = await new mongoose.connect( process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`mongodb connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;