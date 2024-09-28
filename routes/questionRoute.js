var express = require("express");
const questionController = require("../controller/questionController");
var router = express.Router();


router.get('/', questionController.questions_get);
router.post('/submit',questionController.questions_submit_post);

module.exports = router;