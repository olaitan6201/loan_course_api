var express = require('express');
var router = express.Router();


const loanModel = require('../models/loans.model.ts');
// const customerModel = require('../models/customers.model.ts');


/* GET loans listing. */
router.get('/list', function(req, res, next) {
  loanModel.find((err, data)=>{
    if(err) return res.send({status: 500, message: 'Unable to find loans', data: err});

    const count = data.length;
    const perPage = 5;
    const pageCount = Math.ceil(count/perPage);
    let page = req.query.page;
    if(!page) page = 1;
    if(page > pageCount) page = pageCount;
    const from = ((page - 1) * perPage);
    let to = (page * perPage);
    if(to < 0) to = 0;
    if(to > count) to = count;

    data = data.slice(from, to).reverse();

    
    return res.send({status: 200, message: 'Loans fetched successfully', data: data, count: count, page: page, from:from+1, to:to, pageCount: pageCount});
  }).sort({_id: -1});
});

/* GET Details of a selected loan. */
router.get('/view', function(req, res, next) {
  const loanId = req.query.loanId;
  
  loanModel.findById(loanId, (err, data)=>{
    if(err) return res.send({status: 500, message: 'Unable to find loan', data: err});
    
    return res.send({status: 200, message: 'Loan fetched successfully', data: data});
  })
});

/* Create New Loan. */
router.post('/add', function(req, res, next) {

  let data = req.body;

  let loanObj = new loanModel({
    loanName: data.loanName,
    loanType: data.loanType,
    loanAmount: data.loanAmount,
    pendingAmount: data.pendingAmount
  });

  loanObj.save((err, loanObj)=>{
    if(err) return res.send({status: 500, message: 'Unable to add loan', data: err});

    return res.send({status: 200, message: 'Loan added successfully', data: loanObj});
  });
});

/* Update Existing Loan. */
router.put('/update', function(req, res, next) {
  const loanId = req.query.loanId;

  if(!loanId) return res.send({status: 500, message: 'No loan selected'});
  
  data = req.body;
  let loanObj = {
    loanName: data.loanName,
    loanType: data.loanType,
    loanAmount: data.loanAmount,
    pendingAmount: data.pendingAmount
  };

  loanModel.findByIdAndUpdate(loanId, loanObj, (err, data)=>{
    if(err) return res.send({status: 500, message: 'Unable to update loan', data: err});

    return res.send({status: 200, message: 'Loan updated successfully', data: loanObj});
  })
});

/* Delete existing Loan. */
router.delete('/delete', function(req, res, next) {
  const loanId = req.query.loanId;

  if(!loanId) return res.send({status: 500, message: 'No loan selected'});

  loanModel.findByIdAndDelete(loanId, (err, data)=>{
    if(err) return res.send({status: 500, message: 'Unable to delete loan', data: err});
 
    return res.send({status: 200, message: 'Loan deleted successfully', data: data});
  })
});


/* Search Existing loans. */
router.get('/search', function(req, res, next) {
  const keyword = req.query.keyword;
  loanModel.find({$or: [
      {"loanName": { $regex:  `.*${keyword}.*`, $options: 'i'}},
      {"loanType": { $regex:  `.*${keyword}.*`, $options: 'i'}},
      {"loanAmount": { $regex:  `.*${keyword}.*`, $options: 'i'}}
    ]},
    (err, data)=>{
    if(err) return res.send({status: 500, message: 'Unable to find loans', data: err});

    const length = data.length;
    return res.send({status: 200, message: 'Loans fetched successfully', data: data, count: length});
  }).sort({_id: -1});
});


module.exports = router;