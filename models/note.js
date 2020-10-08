const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Schema design
const noteSchema = new Schema({
    title: 
    {
        type: String, 
        required: true
    },
    content: { type: String, required: true},
    
}, {
    timestamps: true,
});

//'Note' == notes in db as a collection
const Note = mongoose.model('Note',noteSchema);

//export the model
module.exports = Note;