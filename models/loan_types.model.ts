const mongoose = require('mongoose');

const loanTypeSchema = mongoose.Schema({
    name: String,
    description: String,
    date_created: {
        type: Date,
        default: Date.now()
    }
});

const loanTypeModel = mongoose.model('LoanType', loanTypeSchema);

module.exports = loanTypeModel;