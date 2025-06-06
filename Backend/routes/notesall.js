const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Notes = require ('../models/Notes');


// ROUTE 1 GET ALL NOTES
router.get(
    '/fetchnotes', fetchuser,
    async (req, res) => {
      const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }
)
//ROUTE 2 ADD A NEW NOTE
router.post(
    '/addnotes', fetchuser, [ 
        body('title', 'Enter a valid title').isLength({ min: 3 }),
        body('content', 'Content must be at least 5 characters').isLength({ min: 5 }),
    ],
    async (req, res) => {
        const {title, content} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const notes = new Notes(
            {
                title, content, user: req.user.id
            }
        )
        const savedNote = await notes.save();
        res.json(savedNote);
    }
)

//ROUTE 3 UPDATE AN EXISTING NOTE
router.put(
    '/updatenotes/:id', fetchuser,
    async (req, res) => {
        const {title, content} = req.body;
        const newNote = {};
        if(title){newNote.title = title};
        if(content){newNote.content = content};
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}
        if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json({note});
    }
)


// ROUTE 4 DELETE NOTES
router.delete(
    '/updatenotes/:id', fetchuser,
    async (req, res) => {
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}
        if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted", note});
    }
)

module.exports = router;