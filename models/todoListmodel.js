const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var date = Date.now;
date=date.toString;
let TodoSchema = new Schema({
    username: {type: String, required: true, max: 50}, 
    name: {type: String, required: true, max: 50},
    desc: {type: String, required: true, max: 300},
    time: {type: Date, default: Date.now},
    priority: {type: Number, required: true},    
    status: {type: Number, required: true},
});

module.exports = mongoose.model('todo', TodoSchema);