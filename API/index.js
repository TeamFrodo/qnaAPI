const express = require("express");
const bodyParser = require("body-parser");
const controller = require("./controllers.js");
const morgan = require('morgan')


const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'))
app.use(express.json());

app.get("/qa/questions", (req, res) => {
  controller.getQuestions(req, res)
});
app.get("/qa/questions/:question_id/answers", (req, res) => {
  controller.getAnswers(req, res);
})
app.post("/qa/questions", (req, res) => {
  controller.addQuestion(req, res);
});
app.post("/qa/questions/:question_id/answers", (req, res) => {
  controller.addAnswer(req, res);
});
app.put("/qa/questions/:question_id/helpful", (req, res) => {
  controller.questionHelpful(req, res);
});
app.put("/qa/questions/:question_id/report", (req, res) => {
  controller.reportQuestion(req, res);
});
app.put("/qa/answers/:answer_id/helpful", (req, res) => {
  controller.answerHelpful(req, res);
});
app.put("/qa/answers/:answer_id/report", (req, res) => {
  controller.reportAnswer(req, res);
});


app.listen(PORT, () => {console.log(`Server is listening at http://localhost:${PORT}`)})