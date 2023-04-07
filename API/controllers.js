const Model = require("./models.js");

async function getQuestions(req, res) {
  const params = req.query;
  // console.log("controller params", params);
  Model.getQuestions(params).then((data) => res.send(data.rows));
}
async function getAnswers(req, res) {
  const params = req.query;
  console.log('params in controller', params)
  Model.getAnswers(params).then((data) => res.status(201).send(data.rows))
}
// const addQuestion = (req, res) {

// }
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
  // addQuestion,
  // addAnswer,
  // questionHelpful,
  // reportQuestion,
  // answerHelpful,
  // reportAnswer
};
