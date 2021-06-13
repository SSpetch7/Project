var express = require('express'),
    router  = express.Router({mergeParams: true}),
    middleware = require('../middleware'),
    Collection = require('../models/item'),
    Comment    = require('../models/comment');

router.get('/new', middleware.isLoggedIn, function(req, res){
    Collection.findById(req.params.id, function(err, foundCollection){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new.ejs", {item: foundCollection});
        }
    });    
});

router.post('/', middleware.isLoggedIn, function(req, res){
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

router.get('/:coment_id/edit', middleware.checkCommentOwner, function(req, res){
    Comment.findById(req.params.coment_id, function(err, foundComment){
        if(err){
            res.redirect('back');
        } else {
            res.render('comments/edit.ejs', {item_id: req.params.id, comment: foundComment});
        }
    });
});

router.put('/:coment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.coment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/item/'+ req.params.id);
        }
    });
});

router.delete('/:coment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndRemove(req.params.coment_id, function(err){
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/item/' + req.params.id);
        }
    });
});
module.exports = router;