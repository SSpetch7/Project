var express = require('express'),
    router = express.Router(),
    Collection = require('../models/collection'),
    comment = require('../models/comment');


router.get('/new',isLoggedIn, function(req,res){
    Collection.findById(req.params.id, function(err,foundCollection){
        if(err){
            console.log(err);
        } else {
            res.render('comments/new.ejs',{home:foundCollection});
        }
    });
});

router.post('/', function(req,res){
    Collection.findById(req.params.id, function(err, foundCollection){
        if(err){
            console.log(err);
            res.redirect('/home');
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else {
                    foundCollection.comments.push(comment);
                    foundCollection.save();
                    
                    res.redirect('/'+foundCollection._id);
                }
            })
        }
    })
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;