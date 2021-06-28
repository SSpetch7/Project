var express = require('express'),
    router  = express.Router(),
    Item    = require('../models/item'),
    User    = require('../models/user');

router.get("/", function(req, res){
    User.find({}, function(err, foundItem){
        if(err){
            console.log(err);
        } else {
            res.render('items/cart.ejs',{item: foundItem});
        }
    })
        
});    

module.exports = router;