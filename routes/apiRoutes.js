// ↓declarations
const router = require("express").Router();
const { notes } = require('../db/db');
const { newNotes, deleteCreatedNotes } = require('../lib/store');

// get existing notes from database json file.
router.get('/notes', (req, res) => {
    let savedNotes = notes;
    res.json(savedNotes);
});

// Save notes to database json file.
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    let note = newNotes(req.body, notes);
    res.json(note);
})

// Delete notes from database json file.
router.delete('/notes/:id', (req, res) => {
    deleteCreatedNotes(notes, req.params.id);
    res.json(notes);
})

module.exports = router;