var express = require('express'),
    router  = express.Router({mergeParams: true}),
    middleware = require('../middleware'),
    Item = require('../models/item'),
    Category = require('../models/category');
    

router.get('/:id', function(req, res){
    Item.findId((req.params.cate_id), function(err, ItembyCategory){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            res.render('Home.ejs',{cate: ItembyCategory});
        }
    })
});

module.exports = router;