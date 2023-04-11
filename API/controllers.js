const Model = require("./models.js");

async function getQuestions(req, res) {
  const params = req.query;
  // Model.getQuestions(params).then((data) => res.send(data.rows));
  let questions = await Model.getQuestions(params);

  let answers = await Promise.all(
    questions.map(async (question) => {
      let answerList = await Model.getAnswers({
        question_id: question.question_id,
      });
      question.answers = answerList;
    })
  );

  const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  };

  const result = questions.map((question) => {
    question.answers = convertArrayToObject(question.answers, "id");
    return question;
  });
  res.send({ product_id: params.product_id, results: result });
  // res.send(result)
  // var answers = async (questions) => {
  //   await questions.map(async function(question, i) {
  //   await Model.getAnswers({question_id: question.question_id}).then(res => question.answers = res);
  //   });
  // };
  // answers(questions).then(res => console.log(res));
  // await questions.forEach(async function (item, i) {
  //   await Model.getAnswers({question_id: item.question_id}).then(res => answers.push(res))
  // }).then(console.log(answers))

  // const combine = async () => {
  //   await questions.forEach(async question => {
  //     await Model.getAnswers({question_id: question.question_id}).then((data)=> {
  //       answers.push(data)
  //     })
  //   })
  // }
  //  combine().then(res => console.log(answers));

  // const combine = async () => {
  //   await questions.forEach(async function (item, i) {
  //     let prop = { question_id: item.question_id };
  //     await Model.getAnswers(prop).then((result) => {
  //       item.answers = result
  //     })
  //     .catch((err) => console.log(err));
  //   });
  //   console.log('80808080808080808080808',questions)
  // }

  // combine();
  //  await combine(questions, resultData);
  //   async function combine(questionsArray, answerArray){
  //     console.log('QUESTIONS ARRAY _________________',questionsArray);
  //     console.log('Answers ARRAY _________________',answerArray);
  //   }
}

function getAnswers(req, res) {
  const query = req.query;
  const params = req.params;
  console.log(query);
  console.log(params)
  Model.getAnswers(params)
    .then((data) => res.send({question: params.question_id, page: query.page, count: query.count, results: data}))
    .catch((err) => console.log(err));
}



function addQuestion(req, res) {
  const params = req.query;
  Model.addQuestion(params)
    .then(() => res.status(201).end())
    .catch((err) => console.log(err));
}
function addAnswer(req, res) {
  req.query.question_id = req.params.question_id;
  const params = req.query;
  console.log(params, "controller params");
  Model.addAnswer(params)
    .then(() => res.status(201).end())
    .catch((err) => console.log(err));
}
function questionHelpful(req, res) {
  //need question_id;
  const params = req.params;
  Model.questionHelpful(params)
    .then(() => res.status(204).end())
    .catch((err) => console.log(err));
}
function reportQuestion(req, res) {
  const params = req.params;
  Model.reportQuestion(params)
    .then(() => res.status(204).end())
    .catch((err) => console.log(err));
}
function answerHelpful(req, res) {
  const params = req.params;
  Model.answerHelpful(params)
    .then(() => res.status(204).end())
    .catch((err) => console.log(err));
}
function reportAnswer(req, res) {
  const params = req.params;
  Model.reportAnswer(params)
    .then(() => res.status(204).end())
    .catch((err) => console.log(err));
}

module.exports = {
  getQuestions,
  getAnswers,
  addQuestion,
  addAnswer,
  questionHelpful,
  reportQuestion,
  answerHelpful,
  reportAnswer,
};
