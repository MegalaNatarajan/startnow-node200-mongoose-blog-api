const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
router.get('/', (req, res) => {
    
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        });
});
router.get('/featured', function(req,res){
    Blog.where({blogs: 'featured'})
    .then(blogs => {
      console.log('get all featured');
      res.status(200).send(blogs);
    })
  })
router.get('/:id',function(req,res){
  var id = req.params.id;
  console.log("Checking for ID ", id);
 Blog.findOne({_id: id}, function(err, record){
      if (record) { console.log ("In success");
      return res.status(200).send(record);
} else
    return res.status(404).send();
      
    
});
  });
  router.delete('/:id',function(req,res){
    var id1 = req.param('id');
    var id = id1.replace(':',"");
    Blog.findByIdAndRemove({_id:id})
    
  .then(blogs => { console.log('Removed the user');
  res.status(200).send();
  });
  });
  router.post('/',function(req,res,next) {
    var userId = req.param('userId');
     var blogs = new Blog({
         author:userId, 
         title: req.param('title'),
         article: req.param('article'),
         published: req.param('published'),
         featured: req.param('featured'),
         _id:userId
       });
      
       blogs.save()
         .then(blogs => {
             console.log('Saved user to DB');
             res.status(201).send(blogs);
         });                
});
    
     
 
  router.put('/:id', function(req,res) {
    var id1 = req.param('id');
    var id = id1.replace(':',"");
    Blog.findByIdAndUpdate({_id: id}, { title: req.param('title'),
    article: req.param('article'),
    published: req.param('published'),
    featured: req.param('featured') })
    .then(blogs => {console.log('Saved the user')
    res.status(204).send(blogs);
  });
  })

module.exports = router;