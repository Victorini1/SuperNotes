const fs = require('fs')
const express = require('express')
const app = express()
const path = require("path");

app.listen(3001)



//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// GET API
app.get('/api/notes'), (req, res) =>{
    res.sendFile(path.join("./db.json"))
}


//POST API to put notes into 
app.post('/api/notes'), (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db.json'));
    const newNotes = req.body;
}

// Static HTML pages
app.get('/', (req, res) => {
    res.sendFile('./public/index.html')
})

app.get("/notes",  (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});