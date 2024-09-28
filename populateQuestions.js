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
        { text: "I feel good about myself." },
        { text: "I am able to concentrate on tasks." },
        { text: "I feel hopeful about the future." },
        { text: "I enjoy doing activities I used to enjoy." },
        { text: "I find it easy to relax." },
        { text: "I feel tired or have little energy." },
        { text: "I have trouble sleeping or sleep too much." },
        { text: "I feel like a failure or have let myself or my family down." },
        { text: "I have little interest or pleasure in doing things." },
        { text: "I feel nervous or anxious." }
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
