const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let LoginSchema = new Schema({
    username: {type: String, required: true, max: 50}, 
    password: {type: String, required: true, max: 50}
});

module.exports = mongoose.model('credential', LoginSchema);