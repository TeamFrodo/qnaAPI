const db = require("./database.js");

async function getQuestions(params) {
//******-----TODO-----******
  // console.log("params in model", params);
  //add in count per page  --conditionals for default
  //add in page requested  --conditionals for default
  //add in joined photos and answers
  const query = `SELECT *
     FROM questions
     WHERE reported = false
     AND product_id = ${params.product_id} `;
  try {
    const res = await db.query(query);
    return res;
    db.end();
  } catch (err) {
    return err.stack;
    db.end();
  }
}
// list Answers
// Params:
//   question_id - int
// Query Params:
//   page
//   count
// Response
//   status 200 OK
async function getAnswers(params){
  console.log(params, 'params in model')
  const query = `SELECT *
    FROM answers
    WHERE reported = false
    AND question_id = ${params.question_id}`
  try {
    const res = await db.query(query);
    return res;
    db.end()
  } catch(err) {
    return err.stack;
    db.end();
  }
};
//Params:
//body - text
//name - text
//email - text
//product_id - int
//Response 201 CREATED
const addQuestion = () => {};
//Params:
//question_id
//body - text
//name - text
//email - text
//pohtos [text]
//Response 201 Created
const addAnswer = () => {};

module.exports = {
  getQuestions,
  getAnswers,
};
