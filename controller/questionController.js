const fs = require("fs");
const path = require("path");

module.exports.questions_get = (req, res) => {
  // Use path.join() to get the absolute path
  const filePath = path.join(
    __dirname,
    "../public/javascripts/json-files/questionnaire.json"
  );

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Unable to load questions" });
    }
    try {
      const questions = JSON.parse(data);
      res.render("questionnaire", { questions });
    } catch (parseError) {
      console.log("Error parsing JSON File: ", parseError);
      res.status(500).json({ error: "Error parsing the questionnaire file" });
    }
  });
};

module.exports.submitAnswer_post = (req, res) => {
  const answers = req.body;
  let totalScore = 0;

  // Map through the answers, calculating the total score
  Object.values(answers).forEach((answer) => {
    totalScore += parseInt(answer); // Sum the values
  });

  // Determine result based on total score
  let result = "";
  if (totalScore <= 7) {
    result = "Very Depressed";
  } else if (totalScore <= 10) {
    result = "Depressed";
  } else if (totalScore <= 13) {
    result = "Low Mood";
  } else if (totalScore <= 16) {
    result = "Normal";
  } else {
    result = "Very Normal";
  }

  // Send the result to the client
  // res.send(`Your total score is: ${totalScore}. You are: ${result}.`);

  res.render("result", { totalScore, result });
};
