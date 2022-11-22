const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');
const cookiesParser = require('cookie-parser')
const productRouter = require('./routes/productRouter')
const  userRouter  = require('./routes/userRouter')

app.use(express.json());
app.use(cookiesParser());


app.use('/api/v1', productRouter);
app.use('/api/v1', userRouter);

//middleware for the error
app.use(errorMiddleware)
module.exports = app;