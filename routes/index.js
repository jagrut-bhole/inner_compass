const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/questions",(req,res) =>{
  res.render("questionnaire");
})

module.exports = router;
