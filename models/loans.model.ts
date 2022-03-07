const mongoose = require('mongoose');

const loanSchema = mongoose.Schema({
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

const loanModel = mongoose.model('Loans', loanSchema);

module.exports = loanModel;