const mongoose = require('mongoose');
require('dotenv').config()
const mongoURI = process.env.REACT_APP_MONGODB_URI;
// console.log(process.env.MONGODB_URI)
// var mong = process.env;
const connectToMongo = async () => {
    // console.log()
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected')
}

module.exports = connectToMongo;