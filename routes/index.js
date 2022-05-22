var express = require('express');
var router = express.Router();
// const mongoose = require('mongoose');
const customerModel = require('../models/customers.model.ts');
const loanModel = require('../models/loans.model.ts');
let resdata = {
  totalCustomers: 0,
  totalLoans: 0,
  approvedLoans: 0,
  pendingLoans: 0,
  riskLoans: 0,
  recievedLoans: 0
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dashboard', (req, res, next) => {
  retrieveDataCount(customerModel, (err, data) => {
    resdata.totalCustomers = data.length;
  });
  retrieveDataCount(loanModel, (err, data) => {
    resdata.totalLoans = data.length;
  });
  retrieveSelectiveDataCount(loanModel, {loanStatus: 1}, (err, data) => {
    resdata.approvedLoans = data.length;
  });
  retrieveSelectiveDataCount(loanModel, {loanStatus: 0}, (err, data) => {
    resdata.pendingLoans = data.length;
  });
  retrieveSelectiveDataCount(loanModel, {loanStatus: 2}, (err, data) => {
    resdata.recievedLoans = data.length;
  });
  retrieveSelectiveDataCount(loanModel, {loanStatus: 3}, (err, data) => {
    resdata.riskLoans = data.length;
  });
  
  setTimeout(()=>{
    console.log(resdata);
    res.send({status: 200, message: 'Dashboard fetched successfully', data: resdata});
  }, 2000)
})

function retrieveDataCount(model, callback){
  model.find(async(err, data) => {
    await callback(null, data);
  });
}
function retrieveSelectiveDataCount(model, data, callback){
  model.find(data, async(err, data) => {
    await callback(null, data);
  });
}

module.exports = router;
