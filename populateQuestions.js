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
        { question: "I generally feel down and unhappy." },
        { question: "I have less interest in other people than I used to." },
        { question: "It takes a lot of effort to start working on something new." },
        { question: " I don't get as much satisfaction out of things as I used to." },
        { question: "I have headaches or back pain for no apparent reason." },
        { question: "I easily get impatient, frustrated, or angry." },
        { question: "I feel lonely, and that people aren't that interested in me." },
        { question: "I feel like I have nothing to look forward to." },
        { question: "I have episodes of crying that are hard to stop." },
        { question: "I have trouble getting to sleep or I sleep in too late." },
        { question: "I feel like my life has been a failure or a disappointment." },
        { question: "I have trouble staying focused on what I'm supposed to be doing." },
        { question: "I blame myself for my faults and mistakes." },
        { question: "I feel like I've slowed down; sometimes I don't have the energy to get anything done." },
        { question: "I have trouble finishing books, movies, or TV shows." },
        { question: "I put off making decisions more often than I used to." },
        { question: "When I feel down, friends and family can't cheer me up." },
        { question: "I think about people being better off without me." },
        { question: "I have less interest in sex than I used to." },
        { question: "I'm eating much less (or much more) than normal and it's affecting my weight." },
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
