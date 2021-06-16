var express = require('express'),
    router  = express.Router(),
    middleware = require('../middleware'),
    Item = require('../models/item'),
    User = require('../models/user'),
    Category = require('../models/category');
    

router.get('/cloth', function(req, res){
    Item.find({}, function(err, ItembyCategory){
        if(err){
            console.log(err);
        } else {
            // res.send(ItembyCategory)
            res.render('categories/Clothshow.ejs',{category :ItembyCategory })
        }
    })
});

module.exports = router;