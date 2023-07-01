// Author: Justin Barlowe
// Title: index.js
// Date: 6/13/2023
// Description: Index JavaScript file for Pets-R-Us

// Imports
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Customer = require('./models/customer'); // Import the Customer model

const conn = 'mongodb+srv://web340_admin:WADUhek12!%40@bellevueuniversity.w2mknhu.mongodb.net/web340DB';

mongoose
  .connect(conn)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Not Connected to MongoDB ERROR! ", err);
  });

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/styles'));
app.use('/js', express.static(__dirname + '/public'));
app.use('/img', express.static(__dirname + '/public/images'));
app.use('/partials', express.static(__dirname + '/views/partials'));


// Set Views and View Engine
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true })); // Middleware to parse form data

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/grooming', (req, res) => {
  res.render('grooming');
});

app.get('/training', (req, res) => {
  res.render('training');
});

app.get('/boarding', (req, res) => {
  res.render('boarding');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const { customerId, email } = req.body;

  const newCustomer = new Customer({ customerId, email });

  newCustomer.save()
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
        console.log(error);
      res.status(500).send('Error registering customer.');
    });
});

// Set port and console log
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log('Press Ctrl-C to terminate');
});
