// Adds our dependencies.
var express = require('express');
var path = require('path');
var fs = require('fs');
const { notEqual } = require('assert');

// Assigns the server to port 8080 and stores the invocation of express within a variable.
var app = express();
var PORT = 8080;

// Middleware that translates objects sent via POST requests into a format that can be read and stored by the server.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connects the stylesheet so it can be referenced by our html files.
app.use(express.static(__dirname + '/public'))

// Returns the notes.html file as a response
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

// Returns the index.html file as a response when a request is sent via the root route
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/api/notes', function(req, res) {
    fs.readFile('db/db.json', 'utf-8', function(err, data) { 
        return res.json(JSON.parse(data));
    })
})

app.post('/api/notes', function(req, res) {
    var newNote = req.body;
    console.log(req.body)
    fs.readFile('db/db.json', 'utf-8', function(err, data) {
        var arr = JSON.parse(data);
        arr.push(newNote);
        if (err) {
            console.log(err);
          }
        fs.writeFile('db/db.json', JSON.stringify(arr), function(err) {
            if (err) {
                console.log(err);
              }
        })
    })
    return res.json('Note added!');
})

app.delete('/api/notes/:id', function(req, res) {
    var chosen = req.params.id;
    fs.readFile('db/db.json', 'utf-8', function(err, data) {
        var arr = JSON.parse(data);

        for (let i = 0; i < arr.length; i++) {
            if (chosen === arr[i].id) {
                arr.splice(arr[i], 1)
                fs.writeFile('db/db.json', JSON.stringify(arr), function(err) {
                    if (err) {
                        console.log(err);
                      }
                })
                return res.json('delete')
            }
        }
    })
})








// Opens the server to listen on the current port setting.
app.listen(PORT, function(){
    console.log(`App listening on port ${PORT}`)
})