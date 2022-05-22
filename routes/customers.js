var express = require('express');
var router = express.Router();

const customerModel = require('../models/customers.model.ts');

// var mongoose = require('mongoose');

/* GET All Customers. */
// router.get('/list', function(req, res, next) {
//   customerModel.find((err, data)=>{
//     if(err) return res.send({status: 500, message: 'Unable to find customers', data: err});

//     const length = data.length;
//     return res.send({status: 200, message: 'Customer fetch successfully', data: data, count: length});
//   }).sort({_id: -1});
// });
router.get('/list', function(req, res, next) {
  customerModel.find((err, data)=>{
    if(err) return res.send({status: 500, message: 'Unable to find customers', data: err});

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
    
    return res.send({status: 200, message: 'Customer fetch successfully', data: data, count: count, page: page, from:from+1, to:to, pageCount: pageCount});
  }).sort({_id: -1});
});

/* GET Details of a selected Customer. */
router.get('/view', function(req, res, next) {
  const userId = req.query.userId;

  customerModel.findById(userId, (err, data)=>{
    if(err) return res.send({status: 500, message: 'Unable to find customer', data: err});

    return res.send({status: 200, message: 'Customer fetch successfully', data: data});
  })
});

/* Create New Customer. */
router.post('/add', function(req, res, next) {

  let data = req.body;

  let customerObj = new customerModel({
    firstName: data.firstName,
    lastName: data.lastName,
    emailAddress: data.emailAddress,
    phoneNumber: data.phoneNumber,
    dob: data.dob,
    department: data.dept
  });

  customerObj.save((err, customerObj)=>{
    if(err) return res.send({status: 500, message: 'Unable to add customer', data: err});

    return res.send({status: 200, message: 'Customer added successfully', data: customerObj});
  });
});

/* Update Existing Customer. */
router.put('/update', function(req, res, next) {
  const userId = req.query.userId;

  if(!userId) return res.send({status: 500, message: 'No user selected'});
  
  data = req.body;
  let customerObj = {
    firstName: data.firstName,
    lastName: data.lastName,
    emailAddress: data.emailAddress,
    phoneNumber: data.phoneNumber,
    dob: data.dob,
    department: data.dept
  };

  customerModel.findByIdAndUpdate(userId, customerObj, (err, data)=>{
    if(err) return res.send({status: 500, message: 'Unable to update customer', data: err});

    return res.send({status: 200, message: 'Customer updated successfully', data: customerObj});
  })
});

/* Delete existing Customer. */
router.delete('/delete', function(req, res, next) {
  const userId = req.query.userId;

  if(!userId) return res.send({status: 500, message: 'No user selected'});

  customerModel.findByIdAndDelete(userId, (err, data)=>{
    if(err) return res.send({status: 500, message: 'Unable to delete customer', data: err});
 
    return res.send({status: 200, message: 'Customer deleted successfully', data: data});
  })
});


/* Search Existing Customers. */
router.get('/search', function(req, res, next) {
  const keyword = req.query.keyword;
  customerModel.find({$or: [
      {"firstName": { $regex:  `.*${keyword}.*`, $options: 'i'}},
      {"lastName": { $regex:  `.*${keyword}.*`, $options: 'i'}},
      {"phoneNumber": { $regex:  `.*${keyword}.*`, $options: 'i'}},
      {"emailAddress": { $regex:  `.*${keyword}.*`, $options: 'i'}}
    ]},
    (err, data)=>{
    if(err) return res.send({status: 500, message: 'Unable to find customers', data: err});

    const length = data.length;
    return res.send({status: 200, message: 'Customer fetch successfully', data: data, count: length});
  }).sort({_id: -1});
});

module.exports = router;
