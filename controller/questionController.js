const Question = require("../models/question");

const Result = require("../models/result");

module.exports.questions_get = async (req, res) => {
  try {
    const questions = await Question.find();
    console.log("Questions fetched: ", questions);
    res.render("questionnaire", { questions });
  } catch (err) {
    console.error("Full error: ", err); // Log the full error object
    res.status(500).send("Error Fetching the Questions");
  }
};


module.exports.questions_submit_post = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null; // Assuming authentication
    if (!userId) {
      return res.status(401).send("User not authenticated");
    }

    // Fetch all questions from the database
    const questions = await Question.find();
    let totalScore = 0;

    // Loop through each question and calculate the total score from the answers
    questions.forEach((question, index) => {
      const answer = parseInt(req.body[`q${index}`]); // Get the selected answer from the form
      if (!isNaN(answer)) {
        totalScore += answer;
      }
    });

    // Determine the result based on the score
    const resultText = getResultText(totalScore);

    // Create a new result document and save it to the database
    const result = new Result({
      userId: userId,
      score: totalScore,
      result: resultText,
    });

    await result.save();

    // Render the result page with the user's score and result
    res.render("result", { score: totalScore, result: resultText });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing the questionnaire");
  }
};

// Helper function to determine the result based on the score
function getResultText(score) {
  if (score <= 10) {
    return "You are doing well. Keep it up!";
  } else if (score <= 20) {
    return "You may have mild symptoms of depression.";
  } else if (score <= 30) {
    return "You may have moderate symptoms of depression.";
  } else {
    return "It is recommended to seek professional help.";
  }
}
