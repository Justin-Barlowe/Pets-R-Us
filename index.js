const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Customer = require('./models/customer'); // Import the Customer model
const Appointment = require('./models/appointment'); // Import the Appointment model

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

// Middleware to parse form data
app.use(express.urlencoded({ extended: true })); 

// Routes 
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

app.get('/appointments', (req, res) => {
  res.render('appointments');
});

app.get('/api/appointments/:email', async (req, res) => {
  try {
    const appointments = await Appointment.find({ email: req.params.email });
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/booking', (req, res) => {
  // load services from the JSON file
  const services = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'public/data/services.json'), 'utf8'));
  
  res.render('booking', { services });
});

// POST route for form submission
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

// POST route for appointment form submission
app.post('/appointments', (req, res) => {
  const { userName, firstName, lastName, email, service } = req.body;

  const newAppointment = new Appointment({ userName, firstName, lastName, email, service });

  newAppointment.save()
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Error registering appointment.');
    });
});

// GET route for customer list
app.get('/customer-list', (req, res) => {
  Customer.find()
    .then((result) => {
      res.render('customer-list', { customers: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Set port and console log
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log('Press Ctrl-C to terminate');
});
