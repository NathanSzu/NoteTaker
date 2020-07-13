// Adds our dependencies.
var express = require('express');
var path = require('path');

// Assigns the server to port 8080 and stores the invocation of express within a variable.
var app = express();
var PORT = 8080;

// Middleware that translates objects sent via POST requests into a format that can be read and stored by the server.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})







// Opens the server to listen on the current port setting.
app.listen(PORT, function(){
    console.log(`App listening on port ${PORT}`)
})