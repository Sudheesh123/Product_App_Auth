const express = require('express');
const router = express.Router();
var auth = require('basic-auth')
var compare = require('tsscmp')

// Require the controllers WHICH WE DID NOT CREATE YET!!
const todo_route = require('./todo.route');

// a simple test url to check that all of our files are communicating correctly.
router.get('/auth',function(req,res){
    //var user = auth(req);
    var username=req.body.username;
    var password=req.body.password;

    if (username === undefined || !check(username, password)) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
        console.log('Unauthorized');
    } else {
        admin = username;
        console.log("Authorized");
        todo_route;
    }
});

function check (name, pass) {
    var valid = true
   
    // Simple method to prevent short-circut and use timing-safe compare
    valid = compare(name, 'username') && valid
    valid = compare(pass, 'password') && valid
   
    return valid
  }

module.exports = router;