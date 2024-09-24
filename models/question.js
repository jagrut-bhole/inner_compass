// models/question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    levels:{
        type: [Number],
        required: true,
        default: [1, 2, 3, 4, 5],
    },
});

module.exports =  mongoose.model('Question', questionSchema);