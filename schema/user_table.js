var mongoose = require('mongoose');
var Schema = mongoose.Schema

var myschema = new Schema({
    user_name : String,
    user_email: String,
    user_phone : Number,
    user_password :String
});

module.exports = mongoose.model('user',myschema);












