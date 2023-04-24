require('dotenv').config();

const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://notslokofc:passwordNotesUp@notesup.e35kxp1.mongodb.net/?retryWrites=true&w=majority"
// console.log(process.env.MONGODB_URI)
// const mongoURI = process.env.MONGODB_URI;
const connectToMongo = async () => {
    console.log(process.env.UHHH)
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected')
}

module.exports = connectToMongo;