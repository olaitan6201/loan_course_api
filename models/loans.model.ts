const loanMongoose = require('mongoose');

const loanSchema = loanMongoose.Schema({
    loanName: String,
    loanType: String,
    loanAmount: Number,
    pendingAmount: Number,
    date_created: {
        type: String,
        default: Date.now()
    },
    loanStatus: {
        type: Number,
        default: 0
    }
});

const loanModel = loanMongoose.model('Loans', loanSchema);

module.exports = loanModel;