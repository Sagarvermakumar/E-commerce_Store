
const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const Product = require('./models/productModel');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 9000;


dotenv.config({ path: 'Backend/config/config.env' });
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.get('/', (req, res) => {
  res.send("this is home page")
});

//coonnect to the database
connectDB();



app.listen(PORT, () => {
  console.log(`server is runing on http://localhost:${PORT}`)
});


//unhandled promise rejection
process.on("unhandledRejection", err => {
  console.log(`error : ${err.message}`);
  console.log("shutting down the server due to unhandled promis Rejection");
});

process.on('MongoParserError', err => {
  console.log(err.message);
});