const express = require('express');         //creating express app
const app = express();                      //creating object
const cookieParser = require('cookie-parser')
const path = require('path');
const cors = require('cors');


// Importing middleware and routes
const errorMiddleware = require('./middlewares/error');
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const ErrorHandler = require('./utils/errorHandler');

// CORS configuration to allow credentials
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));
app.use('/images',express.static(path.join(__dirname,'/public/images')));

app.use('/api/v1',products);
app.use('/api/v1',auth);
app.use('/api/v1',order);

app.use(errorMiddleware);


module.exports = app;                       //exporting app to get the usage with other files
