// Dependencies
// =============================================================
const express = require("express");

// Sets up the Express App
const app = express();
// Identifies the port to listen on
const PORT = process.env.PORT || 8080;

// Links required documents
app.use(require('./controllers/notesController'));
app.use(express.static('public'));

// Opens the server
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
