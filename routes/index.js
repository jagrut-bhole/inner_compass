const express = require("express");
const blogSchema = require("../models/blogs");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/questions",(req,res) =>{
  res.render("questionnaire");
})


router.get("/api/blogs",async (req,res) =>{
const blogs = await blogSchema.find()

res.json(blogs)
})

router.get("/api/blogs/:id",async (req,res) =>{
const blogs = await blogSchema.findById(req.params.id)

res.json(blogs)
})



module.exports = router;
