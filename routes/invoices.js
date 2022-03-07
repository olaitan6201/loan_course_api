var express = require('express');
var router = express.Router();


const invoiceModel = require('../models/invoices.model.ts');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
