const User = require("../models/user");
const jwt = require("jsonwebtoken");


module.exports = function(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error();
    const token = authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, 'ali');

    User.findOne({ _id: decoded.data }).then(function(accountUser) {
      req.user = accountUser;
      next();
      console.log(accountUser)
    });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};



