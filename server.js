// dependencies
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// data
const characters = [
    {
        routeName: 'yoda',
        name: 'Yoda',
        role: 'Jedi Master',
        age: 900,
        forcePoints: 2000,
    },
    {
        routeName: 'darthmaul',
        name: 'Darth Maul',
        role: 'Sith Lord',
        age: 200,
        forcePoints: 1200,
    },
    {
        routeName: 'obiwankenobi',
        name: 'Obi Wan Kenobi',
        role: 'Jedi Knight',
        age: 60,
        forcePoints: 1350,
    },
];

// routes
// homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view.html'));
});

// add form
app.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'add.html'));
});

// get entire Database
app.get('/api/characters', (req, res) => {
    return res.json(characters);
});

// gets a specific character from our database
app.get('/api/characters/:character', (req, res) => {
    // assign route paramater to variable
    const chosen = req.params.character;
    // find character in our array of characters
    const chosenCharacter = characters.find(character => character.routeName === chosen) || false;
    // return the found object in the array
    return res.json(chosenCharacter);
});

// create a new character
app.post('/api/characters/', (req, res) => {
    const newCharacter = req.body;
    newCharacter.routeName = newCharacter.name.replace(/\s+/g, '').toLowerCase();
    characters.push(newCharacter);
    res.json(newCharacter);
});

// start the server
app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));

