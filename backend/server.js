const app = require('./app')                // . used to indicate its from current folder
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/database');


dotenv.config({path:path.join(__dirname,"config/config.env")});
connectDatabase();

// wil create http server
const server = app.listen(process.env.PORT, ()=>{
    console.log(`My Server listening to the port ${process.env.PORT} in ${process.env.NODE_ENV}` ) 
})                         

process.on('unhandledRejection', (err)=> {
    console.log(`Error: ${err.message}`);
    console.log('Shunting down the server due to unhandled rejection error');
    server.close(()=>{
        process.exit(1);
    })


})



process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shunting down the server due to the uncaught exception error');
    server.close(()=>{
        process.exit(1);
    })
})

//console.log(a);