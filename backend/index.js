const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
require("dotenv").config();

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes', require('./routes/notes.js'));


app.listen(port, () => {
  console.log(`NotesUp backend listening on port ${port}`)
});
