var mongoose = require('mongoose');
var Schema =mongoose.Schema;
var bcrypt = require('bcrypt');
var uniqueValidator = require("mongoose-unique-validator");

var schema = new Schema({
    email : {
        type:String, 
        require:true,
        unique:true
    },
    username: {
        type:String, 
        require:true
    },
    password: {
        type:String, 
        require:true
    },
    creation_dt: {
        type:Date, 
        require:true}
});

 
schema.plugin(uniqueValidator);
module.exports = mongoose.model('User', schema);