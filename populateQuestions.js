const mongoose = require('mongoose');
const Question = require('./models/question');
require('dotenv').config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Mongodb is connected...");
    populateQuestions();
  })
  .catch((err) => console.log("MongoDB Connection error", err));

// Function to populate questions
async function populateQuestions() {
    const questions = [
        { questions: "I feel good about myself." },
        { questions: "I am able to concentrate on tasks." },
        { questions: "I feel hopeful about the future." },
        { questions: "I enjoy doing activities I used to enjoy." },
        { questions: "I find it easy to relax." },
        { questions: "I feel tired or have little energy." },
        { questions: "I have trouble sleeping or sleep too much." },
        { questions: "I feel like a failure or have let myself or my family down." },
        { questions: "I have little interest or pleasure in doing things." },
        { questions: "I feel nervous or anxious." }
    ];

    try {
        await Question.insertMany(questions);
        console.log("Questions added to the database.");
        mongoose.connection.close();
    } catch (err) {
        console.log("Error populating questions:", err);
        mongoose.connection.close();
    }
}
