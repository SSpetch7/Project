var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    path = require('path'),
    storage = multer.diskStorage({
                destination: function(req, file, callback){
                    callback(null,"./public/uploads");
                },
                filename: function(req, file, callback){
                    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
                }
            }),
    imageFillter = function(req, file, callback){
                    if(!file.originalname.match(/\.(jpg|jpeg|png)$/i)){
                        return callback(new Error("Only JPG, jpeg and PNG image file are allowed!"),false);
                    }
                    callback (null, true);
                },        
    upload = multer({storage: storage, fileFilter: imageFillter}),
    Item = require('../models/item');

router.get('/',function(req,res){
    Item.find({},function(err, allItemList){
        if(err){
            console.log(err);
        }else {
            res.render("Home.ejs", {items: allItemList});
        } 
    });
});


router.post('/', isLoggedIn, upload.single('image'), function(req, res){
    req.body.item.image = '/uploads/' + req.file.filename;
    Item.create(req.body.item, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect('/item');
        }
    });
});


router.get('/new', isLoggedIn, function(req,res){
    res.render('items/new.ejs');
});

router.get("/:id", function(req, res){
    Item.findById(req.params.id).populate('comments').exec(function(err, foundCollection){
        if(err){
            console.log(err);
        } else {
            res.render("items/show.ejs", {item: foundCollection});
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;