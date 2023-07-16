const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userName: { 
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    service: {
        type: String,
        require: true
    }
});

const appointment = mongoose.model('appointment', appointmentSchema);
module.exports = appointment;

