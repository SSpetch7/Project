var express  = require('express'),  
    router   = express.Router(),
    Cart     = require('../models/cart'),
    User     = require('../models/user'),
    Item     = require('../models/item');


router.post('/add-to-cart/:id',function(req, res){
    User.findById(req.user.id, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            Cart.create({
                userID: req.user.id,
                itemID: req.params.id,
                name: req.query
        })
        }
    })
})



module.exports = router;