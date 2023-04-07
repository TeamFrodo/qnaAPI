const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "rootUser",
  database: "qna",
});

// createTables();

async function createTables() {
  await Promise.all[(createQuestions(), createAnswers(), createPhotos())];
}
const answerData = `COPY answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
  FROM '/Users/Justen/Documents/Precourse/qnaAPI/answers.csv'
  DELIMITER ','
  CSV HEADER;`;
const questionData = `COPY questions(id, product_id, body, date_written,  asker_name, asker_email, reported, helpful)
  FROM '/Users/Justen/Documents/Precourse/qnaAPI/questions.csv'
  DELIMITER ','
  CSV HEADER;`;
const photoData = `COPY photos(id, answer_id, url)
  FROM '/Users/Justen/Documents/Precourse/qnaAPI/answers_photos.csv'
  DELIMITER ','
  CSV HEADER;`;
async function createQuestions() {
  await pool.query(`DROP TABLE IF EXISTS questions`);
  await pool.query(
      `CREATE TABLE questions (
 id SERIAL PRIMARY KEY,
 product_id INT,
 body VARCHAR(1000),
 date_written VARCHAR(1000),
 asker_name VARCHAR(50),
 asker_email VARCHAR(50),
 reported BOOLEAN,
 helpful VARCHAR(1000)
);`
    )
    .then((res) => console.log("created questions table"))
    .then(() => pool.query(questionData))
    .then((result) =>console.log("copied question data rowCount =", result.rowCount))
    .catch((err) => console.log(err));
}
async function createPhotos() {
  // create table for photos
  await pool.query(`DROP TABLE IF EXISTS photos`);
  await pool.query(
      `CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  answer_id INT,
  url TEXT
);`
    )
    .then((res) => console.log("created photos table"))
    .then(() => pool.query(photoData)
    .then((result) => console.log("copied photo data rowCount =", result.rowCount))
    .catch((err) => console.log(err)))
}
async function createAnswers() {
  //create table for answers
  await pool.query(`DROP TABLE IF EXISTS answers`);
  await pool.query(
    `CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INT,
  body TEXT,
  date_written VARCHAR(1000),
  answerer_name TEXT,
  answerer_email TEXT,
  reported BOOLEAN,
  helpful INT
);`
  )
    .then((res) => console.log('created answers table'))
    .then(() => pool.query(answerData)
    .then((result) =>console.log("copied answer data rowCount =", result.rowCount))
    .catch((err) => console.log(err)))
}

module.exports = pool;