const express = require("express");
const blogSchema = require("../models/blogs");
const Question = require("../models/question");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/blogs", (req, res) => {
  res.render("blogs");
});

router.get("/api/blogs", async (req, res) => {
  const blogs = await blogSchema.find();

  res.json(blogs);
});

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

// Question section

router.get("/questions", (req, res) => {
  res.render("questionnaire");
});

router.get("/api/questions", async (req, res) => {
  try {
    const question = await Question.find();
    res.json(question);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Error fetching questions" });
  }
});

// POST: Submit the quiz and calculate score
router.post("/api/submit-quiz", (req, res) => {
  try {
    const { answers } = req.body;

    console.log("Received answers:", answers);

    if (!answers) {
      console.error("No answers provided");
      return res.status(400).json({ error: "No answers provided" });
    }

    const totalScore = calculateScore(answers);

    let resultMessage;
    if (totalScore >= 40) {
      resultMessage =
        "You are fully depressed, Help ghe lavdya.... Marshil bhadvya";
    } else {
      resultMessage =
        "You are not depressed, continue to monitor your mental health.";
    }

    req.session.resultMessage = resultMessage;

    res.json({
      redirectUrl: "/result",
    });
  } catch (error) {
    console.error("Error processing quiz:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/result", (req, res) => {
  const resultMessage = req.session.resultMessage;

  if (!resultMessage) {
    res.redirect("/questions");
  }

  res.render("result", { resultMessage });
});
function calculateScore(answers) {
  let totalScore = 0;

  for (const key in answers) {
    totalScore += answers[key];
  }

  return totalScore;
}

module.exports = router;
