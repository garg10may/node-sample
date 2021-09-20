const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  // res.send('Hello world!');
  res.render('index', { title: 'My express app', message: 'Hello world' });
});


module.exports = router;