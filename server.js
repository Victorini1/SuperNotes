const fs = require('fs')
const express = require('express')
const app = express()
const path = require("path");
const notes = require('./db.json'); // homework\SuperNotes\db.json
const uuid = require('./uuid');

console.log(notes)

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// GET API to read notes
app.get('/api/notes', (req, res) =>{
    console.log(notes);
    res.json(notes)
})


//POST API to put notes into 
app.post('/api/notes', (req, res) => {
    const savedNote = JSON.parse(fs.readFileSync('./db.json'));
    const note = req.body
    // const newNotes = {
    //     title: req.body.title,
    //     text: req.body.text,
    //     id: uuid()}
        
    savedNote.push(note);
    fs.writeFileSync('./db.json', JSON.stringify(savedNote))
    res.json(note);
})
// DELETE API

app.delete('/api/notes/:id', (req, res) =>{
      const note = req.body;
      const id = req.params.id
      notes.forEach((note) =>{
          if (note.id === id){
              notes.splice(id, 1)
              return res.json(note)
          }
          if (err){
              console.error(err)
          }
      })
  })

// Static HTML pages
app.get('/', (req, res) => {
    res.sendFile('./public/index.html')
})

app.get("/notes",  (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//Listening Port
app.listen(3001)
