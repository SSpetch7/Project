var Item = require('../models/item');

var middlewareObj = {};

middlewareObj.checkCollectionOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Item.findById(req.params.id, function(err, foundCollection){
            if(err){
                res.redirect('back');
            } else {
                if(foundCollection.author.id.equals(req.user._id)) {
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
    res.redirect('/login');
}

module.exports = middlewareObj;