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
    Item  = require('../models/item'),
    Category = require('../models/category');
    
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
            req.flash('success','Your item is created.');
            res.redirect('/item');
        }
    });
});

router.get('/new', middleware.isLoggedIn, function(req,res){
    Category.find({}, function(err, foundCategories){
        if(err){
            console.log(err);
        } else {
            res.render('items/new.ejs', {categories: foundCategories});
        }
    })
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

router.post("/cart/:id", middleware.isLoggedIn, function(req, res){
    console.log('POST|User add cart');
    let newCart, inCart = false;
    req.user.cart.forEach(function(item){
        if (item.item_id === req.params.id){

            req.flash('error', 'this Product already in cart.');
            console.log('Product already in cart');
            inCart = true;
        }
    })
    if(!inCart){
        Item.findById({_id: req.params.id}, (function(err, item){
            console.log("item = "+item);
            if(err){
                console.log(err);
            } else {

                newCart = {
                    item_id: item.id,
                    item_image: item.image,
                    item_name: item.name,
                    item_qty: parseInt(req.body.quantity),
                    item_price: item.price,
                    item_total: parseInt(req.body.quantity)*item.price,
                }

                console.log(newCart);
                req.user.cart.push(newCart);
                req.user.save();
                req.flash('success', 'Add item in cart.');
                res.redirect('/item');

            }
        }));
    } else {
        res.redirect('/item');
    }

});
router.post('/cart/delete/:id', function(req, res){
    console.log('POST HERE')
    const id = req.params.id;
    req.user.cart.forEach(function(item){
        if(item.item_id === id){
            req.user.cart.splice(req.user.cart.indexOf(item),1);
            req.user.save();
            console.log('HERE')
            res.redirect('/item/cart');
        }
    })
});
router.post('/search', function(req,res){
    console.log('get|search');
    var key = req.body.key;
    console.log(key);
    Item.find({name: {$regex: '.' + key + '.'}}, function(err, search){
        if(err){
            console.log(err);

        } else {
            console.log("HERE");
            console.log(search);
            res.render('Home.ejs', {items: search});
            
        }
    });

});

module.exports = router;