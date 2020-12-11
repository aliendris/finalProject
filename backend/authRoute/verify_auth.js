const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{ 
        var token = req.query.token;
        jwt.verify(token,'ali');
// const token = req.headers.authorization.split("")[1];
// jwt.verify(token, "ali"); 
next();  
} catch(error){
        res.status(401).json({message:"Authentication failed"});
    }
};



// router.get('/dashboard', verifyToken, function(req,res,next){
//   return res.status(200).json(decodedToken.username);
// })
