const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes.js');

// Router 1: Get all the notes for a user using: GET "/api/notes/fetchallnotes" - login needed
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Router 2: Add a note using: POST "/api/notes/addnote" - login needed
router.post('/addnote', fetchuser, [check('title').isLength({ min: 3 }), check('description').isLength({ min: 5 })], async (req, res) => {

    try {
        
        // check for errors
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }

        // if no error then fetch notes details
        const { title, description, tag } = req.body;

        // create new note and save
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        // respond with saved notes object
        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Router 3: Update an existing Note using: PUT "/api/notes/updatenote" - login needed
router.put('/updatenote/:id', fetchuser, async(req, res) =>{
    
    try {
        
        const {title, description, tag} = req.body;
        //create a newNote object
        const newNote = {}
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
    
        // find the note to be updated, and proceed with updating it
        let note = await Notes.findById(req.params.id);
    
        // if note doent exist return 404(Resource Not Found)
        if(!note){return res.status(404).send("Not Found")};
    
        // if some user is trying to access some other user's note return 401(unauthorized access)
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
    
        // If everything above checks correctly...
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    
        res.json({note});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error);        
    }
    
})

// Router 4: Delete an existing Note using: PUT "/api/notes/deletenote" - login needed
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        
        // Find the note by id from the collection
        let note = await Notes.findById(req.params.id);
        
        // If the Note corresponding to the given ID doesn't exist throw 404(Not Found)
        if(!note){return res.status(404).send("Not Found")};
    
        // If the note id matches but user id doesn't then throw 401(unauthorized access)
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Unauthorised Access");
        }
    
        // If everything checks correctly...Delete the note corresponding to given id and respond with confirmation
        note = await Notes.findByIdAndDelete(req.params.id);
    
        res.json({"Deleted": note});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");        
    }
})



module.exports = router;