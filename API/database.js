const {Client} = require('pg');


const client = new Client ({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'rootUser',
  database: 'qna'
})


 client.connect();
 client.query(`CREATE DATABASE qna;`, (err, res) => {
  if(!err){
    console.log('database created');
  } else {
    console.log(err.message);
  }
   client.end
});


 client.query(`DROP TABLE questions`)
 client.query(`CREATE TABLE questions (id SERIAL PRIMARY KEY,product_id VARCHAR(1000),
  body VARCHAR(1000),
  date_written VARCHAR(1000),
  asker_name VARCHAR(50),
  asker_email VARCHAR(50),
  reported BOOLEAN,
  helpful VARCHAR(1000)
);`, (err, res) => {
  if(err){
    console.log(err)
  } else {
    console.log('created')
  }
 })



const copyData =
  `COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
  FROM '/Users/Justen/Documents/Precourse/qnaAPI/questions.csv'
  DELIMITER ','
  CSV HEADER;`

 client.query(copyData).then(result => {
  console.log('copied Data', result.rows)
}).catch(err => console.log(err))
