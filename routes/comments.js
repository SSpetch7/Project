var express = require('express'),
    router  = express.Router({mergeParams: true}),
    Collection = require('../models/item'),
    Comment    = require('../models/comment');

router.get('/new',isLoggedIn, function(req, res){
    Collection.findById(req.params.id, function(err, foundCollection){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new.ejs", {collection: foundCollection});
        }
    });    
});

router.post('/', isLoggedIn, function(req, res){
    Collection.findById(req.params.id, function(err, foundCollection){
        if(err){
            console.log(err);
            res.redirect('/item');
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundCollection.comments.push(comment);
                    foundCollection.save();
                    res.redirect('/item/'+ foundCollection._id);
                }
            });
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;