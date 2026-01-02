const mongoose = require('mongoose');

/*
const connectDatabase = async() => {
    try {
        const con = await mongoose.connect(process.env.DB_LOCAL_URI, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });

        console.log(`MongoDB is connected to the host: ${con.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
}
*/



const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI).then(con=>{
        console.log(`MongoDB is connected to thé host : ${con.connection.host}`)
    })

}


module.exports = connectDatabase;