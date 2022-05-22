var express = require('express');
var router = express.Router();

const loanTypeModel = require('../models/loan_types.model.ts');

// var mongoose = require('mongoose');

/* GET All loanTypes. */
router.get('/list', function(req, res, next) {
  loanTypeModel.find((err, data)=>{
    if(err) return res.send({status: 500, message: 'Unable to find loan types', data: err});

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
    
    return res.send({status: 200, message: 'Loan Type fetched successfully', data: data, count: count, page: page, from:from+1, to:to, pageCount: pageCount});
  }).sort({_id: -1});
});

/* GET Details of a selected loanType. */
router.get('/view', function(req, res, next) {
  const loanId = req.query.loanId;

  loanTypeModel.findById(loanId, (err, data)=>{
    if(err) return res.send({status: 500, message: 'Unable to find Loan Type', data: err});

    return res.send({status: 200, message: 'Loan Type fetched successfully', data: data});
  })
});

/* Create New loanType. */
router.post('/add', function(req, res, next) {

  let data = req.body;

  let loanTypeObj = new loanTypeModel({
    name: data.name,
    description: data.description
  });

  loanTypeObj.save((err, loanTypeObj)=>{
    if(err) return res.send({status: 500, message: 'Unable to add loan type', data: err});

    return res.send({status: 200, message: 'Loan Type added successfully', data: loanTypeObj});
  });
});

/* Update Existing loanType. */
router.put('/update', function(req, res, next) {
  const loanId = req.query.loanId;

  if(!loanId) return res.send({status: 500, message: 'No user selected'});
  
  data = req.body;
  let loanTypeObj = {
    name: data.name,
    description: data.description
  };

  loanTypeModel.findByIdAndUpdate(loanId, loanTypeObj, (err, data)=>{
    if(err) return res.send({status: 500, message: 'Unable to update loan type', data: err});

    return res.send({status: 200, message: 'Loan Type updated successfully', data: loanTypeObj});
  })
});

/* Delete existing loanType. */
router.delete('/delete', function(req, res, next) {
  const loanId = req.query.loanId;

  if(!loanId) return res.send({status: 500, message: 'No user selected'});

  loanTypeModel.findByIdAndDelete(loanId, (err, data)=>{
    if(err) return res.send({status: 500, message: 'Unable to delete Loan Type', data: err});
 
    return res.send({status: 200, message: 'Loan Type deleted successfully', data: data});
  })
});


/* Search Existing loanTypes. */
router.get('/search', function(req, res, next) {
  const keyword = req.query.keyword;
  loanTypeModel.find({$or: [
      {"name": { $regex:  `.*${keyword}.*`, $options: 'i'}},
      {"description": { $regex:  `.*${keyword}.*`, $options: 'i'}}
    ]},
    (err, data)=>{
    if(err) return res.send({status: 500, message: 'Unable to find Loan Types', data: err});

    const length = data.length;
    return res.send({status: 200, message: 'Loan Type fetch successfully', data: data, count: length});
  }).sort({_id: -1});
});

module.exports = router;
