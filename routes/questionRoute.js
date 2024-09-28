var express = require("express");
var router = express.Router();
const questionController = require("../controller/questionController");

router.get("/", questionController.questions_get);
router.post("/submit", questionController.questions_submit_post);

module.exports = router;
