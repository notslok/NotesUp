const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://notslokofc:passwordNotesUp@notesup.e35kxp1.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = async () => {
    mongoose.connect(mongoURI);
    console.log('MongoDB connected')
}

module.exports = connectToMongo;