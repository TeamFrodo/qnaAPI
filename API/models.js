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

async function getAnswers(params) {
  // console.log(params, 'params in model');
  const query = `SELECT *
    FROM answers
    WHERE reported = false
    AND question_id = ${params.question_id}`;
  try {
    const res = await db.query(query);
    return res;
    db.end();
  } catch (err) {
    return err.stack;
    db.end();
  }
}

async function addQuestion(params) {
  const queryParams = Object.values(params);
  const array = [Math.floor(Date.now() / 1000), false];
  const newParams = queryParams.concat(array);
  const query = `INSERT INTO questions
    (body, asker_name, asker_email, product_id, date_written, reported)
    VALUES ($1, $2, $3, $4, $5, $6)`;
  try {
    await db.query(query, newParams);
    db.end();
  } catch (err) {
    console.log(err);
    db.end();
  }
}

async function addAnswer(params) {
  const queryParams = Object.values(params);
  const photos = Object.values[3];
  queryParams.splice(3, 1);
  const array = [Math.floor(Date.now() / 1000), false];
  const newParams = queryParams.concat(array);
  console.log(newParams);
  const query = `INSERT INTO answers
  (body, answerer_name, answerer_email, question_id, date_written, reported)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING ID`;
  try {
    await db.query(query, newParams).then((res) => console.log(res.rows[0].id));
    //use this res.rows from above to que up the next insert query;
    //run a 4each on the photos array and attach the id on the INSERT;
    db.end();
  } catch (err) {
    console.log(err);
    db.end();
  }
}

async function questionHelpful(params) {
  const id = params.question_id;
  const query = `UPDATE questions SET helpful = helpful + 1 WHERE id = ($1 ) `
  const value = [id];
  try {
    await db.query(query, value).then((res) => console.log(res));
  } catch (err) {
    console.log(err);
    db.end();
  }
}

async function reportQuestion(params) {

}

async function answerHelpful(params) {

}

async function reportAnswer(params) {

}

module.exports = {
  getQuestions,
  getAnswers,
  addQuestion,
  addAnswer,
  questionHelpful,
};
