const express = require("express");
const blogSchema = require("../models/blogs");
const questionSchema = require("../models/question");
const router = express.Router();

const { requireAuth, checkUser } = require("../middleware/authmiddleware");

router.get("*", checkUser);

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

router.get("/questions", requireAuth, (req, res) => {
  res.render("questionnaire");
});

router.get("/api/questions", async (req, res) => {
  const questions = await questionSchema.find();

  res.json(questions);
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

    if (totalScore >= 80) {
      resultMessage =
        "It seems like you're going through a very difficult time. You may be experiencing significant symptoms of depression. Remember, help is available, and you don't have to go through this alone. Please reach out to a mental health professional or someone you trust-support is closer than you think.";
    } else if (totalScore >= 60) {
      resultMessage =
        "You may be dealing with considerable distress and emotional strain right now. It could be helpful to talk to someone about how you're feeling—whether it’s a counselor, therapist, or a close friend. You deserve support, and it’s okay to ask for help.";
    } else if (totalScore >= 40) {
      resultMessage =
        "It seems like you're feeling a bit down or low. Everyone goes through tough times, but it’s important to take care of your mental health. Try reaching out to a friend or family member to talk, or engage in activities that make you feel good.";
    } else if (totalScore >= 20) {
      resultMessage =
        "It looks like you're in a good mental space at the moment. Keep monitoring your mental health and stay connected with people who care about you. Remember, maintaining good mental health is a continuous process.";
    } else {
      resultMessage =
        "It looks like you're in a good mental space at the moment. Keep monitoring your mental health and stay connected with people who care about you. Remember, maintaining good mental health is a continuous process.";
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

router.get("/result", requireAuth, (req, res) => {
  console.log("Session resultMessage:", req.session.resultMessage);

  const resultMessage = req.session.resultMessage;

  if (!resultMessage) {
    return res.redirect("/questions");
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

router.get("/main", (req, res) => {
  res.render("main");
});

router.get("/contact-us", (req, res) => {
  res.render("contactus");
});

router.get("/about", (req, res) => {
  res.render("about");
});
module.exports = router;
