// models/question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    options: [
        {
            optionText: String,
            score: Number // Score associated with this option
        }
    ],
    category: {
        type: String,
        required: true // e.g., "Depression", "Anxiety", etc.
    }
});

module.exports =  mongoose.model('Question', questionSchema);