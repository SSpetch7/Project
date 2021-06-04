var express = require('express'),
    router = express.Router(),
    Collection = require('../models/collection');

router.get('/',function(req,res){
    Collection.find({},function(err, allItemList){
        if(err){
            console.log(err);
        }else {
            res.render("Home.ejs",{collections: allItemList});
        } 
    });
});


router.post('/',function(req,res){
    var name = req.body.name ;
    var image = req.body.image;
    var desc = req.body.desc;
    var price = req.body.price;
    var newItemList = {name : name, image : image, desc : desc, price : price}; 
    Collection.create(newItemList, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect('/home');
        }
    });
});


router.get('/new',function(req,res){
    res.render('collections/new.ejs');
});
/* Show pic */
router.get('/:id',function(req,res){
    Collection.findById(req.params.id).populate('comments').exec(function(err, foundCollection){
        if(err){
            console.log(err);
        } else {
            res.render('collections/show.ejs',{collection: foundCollection});
        }
    });
});

module.exports = router;