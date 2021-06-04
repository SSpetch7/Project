var express = require('express'),
    router = express.Router(),
    Item = require('../models/item');

router.get('/',function(req,res){
    Item.find({},function(err, allItemList){
        if(err){
            console.log(err);
        }else {
            res.render("Home.ejs",{items: allItemList});
        } 
    });
});


router.post('/',function(req,res){
    var name = req.body.name ;
    var image = req.body.image;
    var desc = req.body.desc;
    var price = req.body.price;
    var newItemList = {name : name, image : image, desc : desc, price : price}; 
    Item.create(newItemList, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect('/item');
        }
    });
});


router.get('/new',function(req,res){
    res.render('items/new.ejs');
});
/* Show pic */
router.get('/:id',function(req,res){
    Item.findById(req.params.id).populate('comments').exec(function(err, foundCollection){
        if(err){
            console.log(err);
        } else {
            res.render('items/show.ejs',{item: foundCollection});
        }
    });
});

module.exports = router;