const loanTypeMongoose = require('mongoose');

const loanTypeSchema = loanTypeMongoose.Schema({
    name: String,
    description: String,
    date_created: {
        type: Date,
        default: Date.now()
    }
});

const loanTypeModel = loanTypeMongoose.model('LoanType', loanTypeSchema);

module.exports = loanTypeModel;