const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const { body, validationResult } = require('express-validator');
const app = express();

app.use(bodyParser.json());

const pool = mysql.createPool({
  host: '', // configure as needed
  user: '', // configure as needed
  password: '', // configure as needed
  database: '', // configure as needed
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get all books
app.get('/api/books', (req, res) => {
  const sql = "SELECT * FROM books";
  const query = pool.query(sql, (err, results) => {
    if(err) {
      res.send({success: false});
    }
    else {
      res.send({success: true, results});
    }
  });
});

// Search books
app.post('/api/books/search', (req, res) => {
  let sql = 'SELECT * from books WHERE (id > 0)';
  const data = [];
  // Building the search query based on which parameters are provided
  if(req.body.title) {
    sql += ' AND (title LIKE ?)';
    data.push(`%${req.body.title}%`);
  }
  if(req.body.author) {
    sql += ' AND (author LIKE ?)';
    data.push(`%${req.body.author}%`);
  }
  if(req.body.minLength) {
    sql += ' AND (length >= ?)';
    data.push(req.body.minLength);
  }
  if(req.body.maxLength) {
    sql += ' AND (length <= ?)';
    data.push(req.body.maxLength);
  }
  if(req.body.genre) {
    sql += ' AND (genre = ?)';
    data.push(req.body.genre);
  }
  if(req.body.audience) {
    sql += ' AND (audience = ?)';
    data.push(req.body.audience);
  }
  const query = pool.query(sql, data, (err, results) => {
    if(err) {
      res.send({success: false});
    }
    else {
      res.send({success: true, results});
    }
  });
});

// Add new book
app.post('/api/books', [
  // Using express-validator to validate and sanitize input
  body('title')
    .trim()
    .matches(/^[a-z0-9 <>/`'",;:+-_&%#@!\\^$.|?*+()]+$/i)
    .isLength({ min: 1, max: 40 })
    .escape(),
  body('author')
    .matches(/^([A-Za-z]+),\s([A-Za-z]+)$/)
    .isLength({ min: 1, max: 25 }),
  body('length').isInt({ min: 1, max: 9999 }),
  body('genre').isIn(['fiction', 'nonfiction']),
  body('audience').isIn(['adults', 'children'])
], (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.send({success: false});
  }
  else {
    const sql = 'INSERT INTO books (title, author, genre, length, audience) VALUES (?, ?, ?, ?, ?)';
    const data = [req.body.title, req.body.author, req.body.genre, req.body.length, req.body.audience];
    const query = pool.query(sql, data, (err, results) => {
      if(err) {
        res.send({success: false});
      }
      else {
        res.send({success: true});
      }
    });
  }
});
 
// Edit book
app.put('/api/books', [
  body('title')
    .trim()
    .matches(/^[a-z0-9 <>/`'",;:+-_&%#@!\\^$.|?*+()]+$/i)
    .isLength({ min: 1, max: 40 })
    .escape(),
  body('author')
    .matches(/^([A-Za-z]+),\s([A-Za-z]+)$/)
    .isLength({ min: 1, max: 25 }),
  body('length').isInt({ min: 1, max: 9999 }),
  body('genre').isIn(['fiction', 'nonfiction']),
  body('audience').isIn(['adults', 'children'])
], (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.send({success: false});
  }
  else {
    const sql = 'UPDATE books SET title=?, author=?, genre=?, length=?, audience=? WHERE id=?';
    const data = [req.body.title, req.body.author, req.body.genre, req.body.length, req.body.audience, req.body.id];
    const query = pool.query(sql, data, (err, results) => {
      if(err) {
        res.send({success: false});
      }
      else {
        res.send({success: true});
      }
    });
  }
});
 
// Delete book
app.delete('/api/books/:bookId',(req, res) => {
  const sql = 'DELETE FROM books WHERE id=?';
  const query = pool.query(sql, [req.params.bookId], (err, results) => {
    if(err) {
      res.send({success: false});
    }
    else {
      res.send({success: true});
    }
  });
});

module.exports = app;
