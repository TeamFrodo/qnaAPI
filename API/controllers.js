const Model = require("./models.js");

function getQuestions(req, res) {
  const params = req.query;
  // console.log("controller params", params);
  Model.getQuestions(params).then((data) => res.send(data.rows));
}
function getAnswers(req, res) {
  const query = req.query;
  const params = req.params;

  // console.log("params in controller", params, query);
  Model.getAnswers(params).then((data) => res.send(data.rows));
}
function addQuestion(req, res) {
  const params = req.query;
  Model.addQuestion(params).then(() => res.status(201).end());
}
// const addAnswer = (req, res) {

// }
// const questionHelpful = (req, res) {

// }
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
  // addAnswer,
  // questionHelpful,
  // reportQuestion,
  // answerHelpful,
  // reportAnswer
};
