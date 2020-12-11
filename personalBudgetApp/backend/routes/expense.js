var express = require('express');
var router = express.Router();
var Expense = require('../models/expense');
const user = require('../models/user');
const routAuth = require("../authRoute/verify_auth");
var jwt = require("jsonwebtoken");

router.post('/dashboard',  function(req,res,next){
  var expense = new Expense({
    title: req.body.title,
    value: req.body.value,
    color: req.body.color
  });

  let promise = expense.save();

  promise.then(function(data){
    return res.status(201).json(data);
  })

  promise.catch(function(err){
    return res.status(501).json({message: 'Error in inserting user data.'})
  })
})
var decodedToken='';
function verifyToken(req,res,next){
  let token = req.query.token;

  jwt.verify(token,'ali', function(err, tokendata){
    if(err){
      return res.status(400).json({message:' Unauthorized request'});
    }
    if(tokendata){
      decodedToken = tokendata;
      next();
    }
  })
}

router.get('/expenseData', function(req,res,next){
  
  let promise = Expense.find({});

  promise.then(function(data){

    return res.json(data).status(201);
  })

  promise.catch(function(err){
    return res.status(501).json({message: 'Data not found.'})
  })
})



module.exports = router;