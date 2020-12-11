var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const user = require('../models/user');


router.post('/register', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    var user = new User({
      email: req.body.email,
      username: req.body.username,
      password: hash,
      // User.hashPassword(req.body.password),
      creation_dt: Date.now()
     });
    user.save()
      .then(result => {
       res.status(201).json({
      message: 'User created',
      result
    });
  })
   .catch(err => {
     res.status(500).json({
      message: 'User email is not valid',
       error:err
     });
   });
  
  });
});

router.post('/login', (req, res, next) =>{
User.findOne({email: req.body.email})
.then(user => {
if(!user){
  return res.status(401).json({
    message:"Auth failed"
  });
}
return bcrypt.compare(req.body.password, user.password);
})
.then(result => {
 if (result){

 }
 var token = jwt.sign({email: user.email, userId: user._id}, 'ali', {expiresIn: "2h"}
 );
 res.status(200).json({
   token: token,
 });
})
.catch(err =>{
  return res.status(401).json({
    message: "Auth failed"
  });
});
});


// var decodedToken='';
// function verifyToken(req,res,next){
//   var token = req.query.token;
//   jwt.verify(token,'ali', function(err,tokendata){
//     if(err){
//       return res.status(400).json({message:' login to see the Dashboard'});
//     }
//     if(tokendata){
//       decodedToken =tokendata; 
//       next();
//     }
//   })
// }
// router.get('/dashboard', verifyToken, function(req,res,next){
//   return res.status(200).json(decodedToken.username);
// })



module.exports = router;