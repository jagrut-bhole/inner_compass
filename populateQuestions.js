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
        { question: "I feel good about myself." },
        { question: "I am able to concentrate on tasks." },
        { question: "I feel hopeful about the future." },
        { question: "I enjoy doing activities I used to enjoy." },
        { question: "I find it easy to relax." },
        { question: "I feel tired or have little energy." },
        { question: "I have trouble sleeping or sleep too much." },
        { question: "I feel like a failure or have let myself or my family down." },
        { question: "I have little interest or pleasure in doing things." },
        { question: "I feel nervous or anxious." }
    ];

    try {
        await Question.insertMany(questions);
        console.log("Questions added to the database.");
    } catch (err) {
        console.log("Error populating questions:", err);
    } finally {
        mongoose.connection.close(); // Close the connection here
    }
}
