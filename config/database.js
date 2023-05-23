const mongoose = require('mongoose');
const admin = require('./admin')
require('dotenv').config()

function connect (){
    
    const uri = process.env.DATABASE_URL
    try{
         mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
        const connection = mongoose.connection;
        connection.once('open', () => {
        console.log("MongoDB database connection established successfully");

        admin.create_admin()

        admin.create_empty_profile()

        })
    }catch(e){
        console.log(e)
    }
}

module.exports = {connect};