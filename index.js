// Author: Justin Barlowe
// Title: index.js
// Date: 6/13/2023
// Description: Index JavaScript file for Pets-R-Us

//Imports
const express = require('express');
const app = express();
const port = 3000;

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/styles'));
app.use('/js', express.static(__dirname + '/public'));
app.use('/img', express.static(__dirname + '/public/images'));
app.use('/partials', express.static(__dirname + '/views/partials'));

// Set Views and View Engine
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/grooming', (req, res) => {
    res.render('grooming');
});

// app.get('/training', (req, res) => {
//     res.render('training');
// });

//Set port and console log
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
