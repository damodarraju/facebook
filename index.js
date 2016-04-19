var express = require('express');
var app = express();
var request = require('request');
request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log("Request working") 
  }
})


var bodyParser = require('body-parser')
  
app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())
 
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})

var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;


app.listen(port, function() {
        console.log('%s: Node server started on %s:%d ...')
});

// app.listen(3000, function() {
//   console.log('Bot working'));
// });

app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === '1234') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
})
