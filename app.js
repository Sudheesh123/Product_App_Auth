const express = require('express');
const bodyParser = require('body-parser');
const Todo = require('./routes/todo.route'); // Imports routes for the products
const mongoose = require('mongoose');
const app = express();
mongoose.connect("mongodb://localhost:27017/todo");
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', ()=>{
    console.log("Mongo DB Connection Error")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); 
app.use('/todo', Todo);
let port = 8000;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});