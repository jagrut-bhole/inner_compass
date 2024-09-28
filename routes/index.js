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

router.get("/api/blogs/:id",async (req,res) =>{
  const blogs = await blogSchema.findById(req.params.id)
  
  res.json(blogs)
})

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
