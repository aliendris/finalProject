var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  
    title : {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    value: {
        type: Number,
        required: true,
        unique: true
    },
    color: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    }
   
});

module.exports = mongoose.model('Expense', schema);