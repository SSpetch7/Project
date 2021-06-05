var express = require('express'),
    router = express.Router({mergeParams: true}),
    Collection = require('../models/item'),
    Comment = require('../models/comment');


router.get('/item/:id',function(req,res){
    Comment.author('posts').findById
})

router.post('/do-comment',function(req,res){
    blog.Collection('posts').update({"_id":ObjectId(req.params.id)}, {
        $push: {
            "comments" : {comment:req.body.comment }
        }
    }, function(err,post){
        res.send('comment successfull');
    });
});    

module.exports = router;