var Item = require('../models/item'),
    Comment = require('../models/comment');


var middlewareObj = {};

middlewareObj.checkItemOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Item.findById(req.params.id, function(err, foundCollection){
            if(err){
                res.redirect('back');
            } else {
                if(foundCollection.author.id.equals(req.user._id)) { // เทียบ id ปัจจุบันกับ id เจ้าของ item ถ้าตรงกันสามารถ edit ได้
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
}

middlewareObj.checkCommentOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.coment_id, function(err, foundComment){
            if(err){
                res.redirect('back');
            } else {
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
}


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to sign in first!');
    res.redirect('/login');
}

module.exports = middlewareObj;