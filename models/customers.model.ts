const cusMongoose = require('mongoose');

const customerSchema = cusMongoose.Schema({
    firstName: String,
    lastName: String,
    emailAddress: String,
    phoneNumber: String,
    dob: String,
    department: String
});

const customerModel = cusMongoose.model('Customers', customerSchema);

module.exports = customerModel;