var express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.use(bodyParser.json());

const tasks = []

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = req.body; 
  tasks.push(task);
  res.send('Task added successfully');

});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})