const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    emailAddress: String,
    phoneNumber: String,
    dob: String
});

const customerModel = mongoose.model('Customers', customerSchema);

module.exports = customerModel;