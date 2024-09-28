const express=  require("express");
const router = express.Router();
const questionController = require("../controller/questionController");

router.get('/',questionController.questions_get);

router.post('/submit' ,questionController.submitAnswer_post);

module.exports = router;