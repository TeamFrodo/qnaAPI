const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "rootUser",
  database: "qna",
});
create();
//establish connection and create database

const answerData = `COPY answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
  FROM '/Users/Justen/Documents/Precourse/qnaAPI/answers.csv'
  DELIMITER ','
  CSV HEADER;`;

const questionData = `COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
  FROM '/Users/Justen/Documents/Precourse/qnaAPI/questions.csv'
  DELIMITER ','
  CSV HEADER;`;

const photoData = `COPY photos(id, answer_id, url)
FROM '/Users/Justen/Documents/Precourse/qnaAPI/answers_photos.csv'
DELIMITER ','
CSV HEADER;`;

async function create() {
  await client.connect();

  //create table for answers
  await client.query(`DROP TABLE IF EXISTS answers`);
  await client.query(
    `CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id VARCHAR(1000),
  body VARCHAR(1000),
  date_written VARCHAR(1000),
  answerer_name VARCHAR(50),
  answerer_email VARCHAR(50),
  reported BOOLEAN,
  helpful VARCHAR(1000)
);`,
    (err, res) => {
      if (err) {
        console.log("error in table create", err);
      } else {
        console.log("created answers table");
      }
    }
  );
  // create table for photos
  await client.query(`DROP TABLE IF EXISTS photos`);
  await client.query(
    `CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  answer_id VARCHAR(1000),
  url VARCHAR(1000)
);`,
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("created photos table");
      }
    }
  );

  // create table for questions
  await client.query(`DROP TABLE IF EXISTS questions`);
  await client.query(
    `CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  product_id VARCHAR(1000),
  body VARCHAR(1000),
  date_written VARCHAR(1000),
  asker_name VARCHAR(50),
  asker_email VARCHAR(50),
  reported BOOLEAN,
  helpful VARCHAR(1000)
);`,
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("created questions table");
      }
    }
  );

  //Populate data in tables
  await client
    .query(photoData)
    .then((result) => {
      console.log("copied photo data rowCount =", result.rowCount);
    })
    .catch((err) => console.log(err));

  await client
    .query(questionData)
    .then((result) => {
      console.log("copied question data rowCount =", result.rowCount);
    })
    .catch((err) => console.log(err));

  await client
    .query(answerData)
    .then((result) => {
      console.log("copied answer data rowCount =", result.rowCount);
    })
    .catch((err) => console.log(err));

    client.end()
}
