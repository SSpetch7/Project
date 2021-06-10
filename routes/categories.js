var express = require('express'),
    router  = express.Router({mergeParams: true}),
    middleware = require('../middleware'),
    Item = require('../models/item'),
    Category = require('../models/category');
    

router.get('/:name', function(req, res){
    Item.findone((req.params.Category), function(err, ItembyCategory){
        if(err){
            console.log(err);
        } else {
            res.render('Home.ejs',{cate: ItembyCategory});
        }
    })
});

module.exports = router;