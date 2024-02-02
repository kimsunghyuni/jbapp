const express = require('express');
const app = express();
const path = require('path')

const PORT = 3000;

app.use(express.json());
var cors = require('cors');
app.use(cors());


app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.get('/product', function (req, res) {
  res
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});








app.listen(PORT, function () {
  console.log('server is runnging on 3000')
});


