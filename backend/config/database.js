const mongoose = require("mongoose");

const connectDatabase =()=>{
    mongoose.connect(process.env.DB_URI).then((data)=>{
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    }).catch((err)=>{
        console.error(`Eroor connecting to mongodb: ${err}`);
        process.exit(1);//Exit the process if there is error
    })
}

module.exports = connectDatabase;