var express = require('express'),
    router  = express.Router(),
    multer  = require('multer'),
    path    = require('path'), 
    middleware = require('../middleware'),
    storage = multer.diskStorage({
                destination: function(req, file, callback){
                    callback(null,'./public/uploads/');
                },
                filename: function(req, file, callback){
                    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
                }
            }),
    imageFilter = function (req, file, callback){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
            return callback(new Error('Only JPG, jpeg, PNGm and GIF image files are allowed!'), false);
        }
        callback(null, true);
    },
    upload  = multer({storage: storage, fileFilter: imageFilter}),        
    Item  = require('../models/item');

router.get('/', function(req, res){
    Item.find({}, function(err, allItemList){
        if(err){
            console.log(err);
        } else {
            res.render('Home.ejs', {items: allItemList});
        }
    });
});

router.post('/', middleware.isLoggedIn, upload.single('image'), function(req, res){
    console.log(req.file);
    req.body.item.image = '/uploads/'+ req.file.filename;
    req.body.item.author = {
        id: req.user._id,
        username: req.user.username
    };
    Item.create(req.body.item, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect('/item');
        }
    });
});

router.get('/new', middleware.isLoggedIn, function(req,res){
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

router.get('/:id/edit', middleware.checkItemOwner, function(req, res){
    Item.findById(req.params.id, function(err, foundCollection){
        if(err){
            console.log(err);
        } else {
            res.render('items/edit.ejs', {item: foundCollection})
        }
    });
});

router.put('/:id', upload.single('image'), function(req, res){
    if(req.file){
        req.body.item.image = '/uploads/'+ req.file.filename;
    }
    Item.findByIdAndUpdate(req.params.id, req.body.item, function(err, updatedCollection){
        if(err){
            res.redirect('/item/');
        } else {
            res.redirect('/item/'+req.params.id);
        }
    });
});

router.delete('/:id', middleware.checkItemOwner, function(req, res){
    Item.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/item/');
        } else {
            res.redirect('/item');
        }
    });
});

module.exports = router;