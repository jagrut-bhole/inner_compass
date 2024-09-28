const express = require("express");
const blogSchema = require("../models/blogs");
const questionSchema =  require("../models/question");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});


router.get("/blogs",(req,res) =>{
  res.render("blogs");
})

router.get("/api/blogs",async (req,res) =>{
  const blogs = await blogSchema.find()
  
  res.json(blogs)
})


router.get("/api/blogs/:id", async (req, res) => {
  const blogs = await blogSchema.findById(req.params.id);

  res.json(blogs);
});
router.get("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await blogSchema.findById(req.params.id);

    if (!blog) {
      return res.status(404).send("Blog post not found");
    }

    // Render the 'blog-details.ejs' file and pass the blog data to it
    res.json(blog);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.get("/blogs/:id", (req, res) => {
  const blogId = req.params.id;
  res.render("blog-details", { blogId });
});

router.get("/result", (req, res) => {
  const resultMessage = req.query.message;
  res.render("result", { resultMessage });
});

// Question section

router.get("/questions",(req,res) =>{
  res.render("questionnaire");
});

router.get("/api/questions", async (req,res) => {
  const questions = await questionSchema.find();

  res.json(questions);
});

// POST: Submit the quiz and calculate score
router.post("/api/submit-quiz", (req, res) => {
  try {
    const { answers } = req.body;

    // Log received answers
    console.log("Received answers:", answers);

    // If no answers are provided, return an error
    if (!answers) {
      console.error("No answers provided");
      return res.status(400).json({ error: "No answers provided" });
    }

    // Calculate total score (make sure calculateScore is correctly defined)
    const totalScore = calculateScore(answers);

    // Determine result based on score
    let resultMessage;
    if (totalScore >= 40) {
      resultMessage = "You are fully depressed, please seek help.";
    } else {
      resultMessage =
        "You are not depressed, continue to monitor your mental health.";
    }

    console.log("Total score:", totalScore, "Result message:", resultMessage);

    // Return the result and redirect URL
    res.json({
      redirectUrl: `/result?message=${encodeURIComponent(resultMessage)}`,
    });
  } catch (error) {
    // Log the error and respond with a 500 status
    console.error("Error processing quiz:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
function calculateScore(answers) {
  let totalScore = 0;

  // Loop through the answers and sum up the values
  for (const key in answers) {
    totalScore += answers[key];
  }

  return totalScore;
}

module.exports = router;
