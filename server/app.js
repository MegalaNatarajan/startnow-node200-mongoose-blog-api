var express = require('express');
const mongoose = require('mongoose');
const userModel = require('./models/User.js');
const blogModel = require('./models/Blog.js');
const bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
mongoose.connect('mongodb://localhost/my-blog', { useMongoClient: true });
mongoose.Promise = Promise;
app.use(morgan('dev'));
app.use(bodyParser.json());
var users = new userModel({
    firstName: 'ragav',
    lastName: 'viswanathan',
    email: 'megalainla@gmail.com',
    social : {  
      facebook: 'fromUsername',
      twitter: 'toUsername',  
       
      linkedIn: 'message is here'},
    
   
  });
  users.save()
    .then(users => {
        console.log('Saved user to DB');
    });


app.get( '/', function( req, res ) {
    res.status(200).send();
  });
app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));
module.exports = app;
