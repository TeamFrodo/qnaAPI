const Model = require("./models.js");

function getQuestions(req, res) {
  const params = req.query;
  // console.log("controller params", params);
  Model.getQuestions(params).then((data) => res.send(data.rows));
}
function getAnswers(req, res) {
  const query = req.query;
  const params = req.params;
  Model.getAnswers(params).then((data) => res.send(data.rows));
}
function addQuestion(req, res) {
  const params = req.query;
  Model.addQuestion(params)
    .then(() => res.status(201).end())
    .catch(err => console.log(err));
}
function addAnswer(req, res) {
 req.query.question_id = req.params.question_id;
 const params = req.query;
 console.log(params,'controller params')
 Model.addAnswer(params)
   .then(() => res.status(201).end())
   .catch(err => console.log(err))
}
function questionHelpful(req, res) {
  //need question_id;
  const params = req.params;
  console.log(params);
  Model.questionHelpful(params)
    .then(() => res.status(204).end())
    .catch(err => console.log(err))
}
// const reportQuestion = (req, res) {

// }
// const answerHelpful = (req, res) {

// }
// const reportAnswer = (req, res) {

// }

module.exports = {
  getQuestions,
  getAnswers,
  addQuestion,
  addAnswer,
  questionHelpful,
  // reportQuestion,
  // answerHelpful,
  // reportAnswer
};
