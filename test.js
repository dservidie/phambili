
var express = require('express');
var app = express();

console.log('Initializing test code');

app.get('/', function (req, res) {
  res.send('Its working!');
});

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});

