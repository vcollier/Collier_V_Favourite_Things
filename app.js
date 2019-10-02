const express = require('express');
const path = require('path');
const hbs = require('hbs');

const sql = require('./utils/sql');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));

app.set('view engine', 'hbs');

app.set('views', __dirname + '/views');


app.get('/', (req, res) => {
  console.log('at the home route');

  res.render('home', { message: "hi there!", anothermessage: "This is easy!"});

})

app.get('/contact', (req, res) => {

  res.render('contact', { message: "what is your name?" })
})

app.get('/users', (req, res) => {
  sql.getConnection((err, connection) => {
    if (err) {
      return console.log(err.message);
    }

    let query = `SELECT * FROM tbl_card`;

    sql.query(query, (err, rows) => {
      connection.release();

      if (err) { return console.log(err.message) }

      console.log(rows);

      res.render('user', rows[0]);
    })
  })
})

app.get('/portfolio', (req, res) => {
  res.send('on the portfolio page!');
})

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});