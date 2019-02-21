const Todo = require('../models/todo.model');
var auth = require('basic-auth')
var compare = require('tsscmp')
var current_user;
//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.todo_authenticate= function(req,res){
    var credentials = auth(req);



    if (!credentials || !check(credentials.name, credentials.pass)) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
        res.end('Unauthorized');
    } else {
        current_user = credentials.name;
        res.writeHead(301, { Location: 'http://localhost:8000/todo/all' });
        console.log("authorized");
       res.end();
    }
};

function check (name, pass) {
    var valid = true
   
    // Simple method to prevent short-circut and use timing-safe compare
    valid = compare(name, 'username') && valid
    valid = compare(pass, 'password') && valid
   
    return valid
  }

exports.todo_create = function (req, res) {
    let todo = new Todo(
        {   
            username:current_user,
            name:req.body.name,
            desc: req.body.desc,
            priority:req.body.priority,
            status: req.body.status
        }
    );
    todo.save(function (err) {
        if (err) throw err;
        res.send(todo)
    })
};

exports.todos_details = function (req, res) {
    Todo.find({username:current_user}, function(err, result) {
        if (err) throw err;
        console.log(current_user);
        res.send(result);
      })
};

exports.todo_details = function (req, res) {
    Todo.find({_id:req.params.id,username:current_user}, function (err, todo) {
        if (err) throw err;
        res.send(todo);
    })
};


exports.todo_update = function (req, res) {
    Todo.findOneAndUpdate({_id:req.params.id,username:current_user}, {$set: req.body}, function (err, todo) {
        if (err) throw err;
        console.log("Updated the record!");
        res.send(todo);
    });
};

exports.todo_delete = function (req, res) {
    Todo.findOneAndRemove({_id:req.params.id,username:current_user}, function (err) {
        if (err) throw err;
        res.send('Deleted successfully!');
    })
};

