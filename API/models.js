const db = require("./database.js");

async function getQuestions(params) {
  //******-----TODO-----******
  // console.log("params in model", params);
  //add in count per page  --conditionals for default
  //add in page requested  --conditionals for default
  //add in joined photos and answers
    //*****FIRST ATTEMPT */
  const query =
  `SELECT
    questions.id as question_id,
    questions.body as question_body,
    questions.date_written as question_date,
    questions.asker_name as asker_name,
    questions.helpful as question_helpfulness,
    questions.reported as reported
  FROM questions
  WHERE reported = false
  AND product_id = ${params.product_id} `;
  // const query = `
  //   SELECT
  //     json_build_object
  //       ('questionID', questions.id, 'questionBody', questions.body, 'answers',
  //       jsonb_agg(to_jsonb(answers)), 'photos', jsonb_agg(to_jsonb(photos)- 'answer_id')
  //       ) AS RESULTS
  // FROM questions
  // INNER JOIN answers ON answers.question_id = questions.id
  // INNER JOIN photos ON photos.answer_id = answers.id
  // WHERE questions.reported = false
  // AND questions.product_id = ${params.product_id}
  // AND answers.reported = false
  // GROUP BY questions.id;`
  try {
    const res = await db.query(query);
    return res.rows;
  } catch (err) {
    console.log(err);
  }
}

async function getAnswers(params) {
  // console.log(params, 'params in model');
  console.log(params, 'params in model')
  const query = `SELECT answers.id, answers.body, answers.date_written, answers.answerer_name, answers.helpful,
  jsonb_agg(to_jsonb(photos) - 'answer_id') AS photos
    FROM answers
    LEFT JOIN photos ON photos.answer_id = answers.id
    WHERE reported = false
    AND question_id = ${params.question_id}
    GROUP BY answers.id`;
  // const query = `SELECT json_build_object(
  //   'answerID', answers.id,
  //   'answerBody', answers.body,
  //   FROM answers
  //   WHERE answers.question_id = ${params.question_id}
  //   AND answers.reported = false
  //   GROUP BY answers.id;

  try {
    const res = await db.query(query)
    return res.rows;
  } catch (err) {
    console.log('error in model',err)
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
  const query = `UPDATE questions SET helpful = helpful + 1 WHERE id = ($1 ) `;
  const value = [id];
  try {
    await db.query(query, value).then((res) => console.log(res));
  } catch (err) {
    console.log(err);
    db.end();
  }
}

async function reportQuestion(params) {
  const id = params.question_id;
  const query = `UPDATE questions SET reported = true WHERE id = ($1 ) `;
  const value = [id];
  try {
    await db.query(query, value).then((res) => console.log(res));
  } catch (err) {
    console.log(err);
    db.end();
  }
}

async function answerHelpful(params) {
  const id = params.answer_id;
  const query = `UPDATE answers SET helpful = helpful + 1 WHERE id = ($1 ) `;
  const value = [id];
  try {
    await db.query(query, value).then((res) => console.log(res));
  } catch (err) {
    console.log(err);
    db.end();
  }
}

async function reportAnswer(params) {
  const id = params.answer_id;
  const query = `UPDATE answers SET reported = true WHERE id = ($1 ) `;
  const value = [id];
  try {
    await db.query(query, value).then((res) => console.log(res));
  } catch (err) {
    console.log(err);
    db.end();
  }
}

module.exports = {
  getQuestions,
  getAnswers,
  addQuestion,
  addAnswer,
  questionHelpful,
  answerHelpful,
  reportAnswer,
  reportQuestion
};

