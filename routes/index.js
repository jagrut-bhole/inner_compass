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

router.get("/questions",(req,res) =>{
  res.render("questionnaire");
});

router.get("/api/questions", async (req,res) => {
  const questions = await questionSchema.find();

  res.json(questions);
});

// router.get('api/questions/:id', async (req,res) => {
//   const questions = await questionSchema.findById(req.params.id);
// })



module.exports = router;
