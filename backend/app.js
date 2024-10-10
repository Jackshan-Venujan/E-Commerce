const express = require('express');         //creating express app
const app = express();                      //creating object
const cookieParser = require('cookie-parser')


// Importing middleware and routes
const errorMiddleware = require('./middlewares/error');
const products = require('./routes/product');
const auth = require('./routes/auth');
const ErrorHandler = require('./utils/errorHandler');

app.use(express.json());
app.use(cookieParser());


app.use('/api/v1',products);
app.use('/api/v1',auth);

app.use(errorMiddleware);


module.exports = app;                       //exporting app to get the usage with other files
