const mongoose = require("mongoose");
require('dotenv').config();

// connect to database 


exports.connectdb = ()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("database is connected..brother")
    }).catch((err)=>{
        console.log(err);
    })
}