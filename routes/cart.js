var express  = require('express'),  
    router   = express.Router(),
    Item     = require('../models/item');

router.get('/add/:item', function(req, res){
    var slug = req.params.item;
    Item.findOne({slug: slug}, function(err, item){
        if(err){
            console.log(err)
        } 
        if(typeof req.session.cart == 'undefined'){
            req.session.cart = [];
            req.session.cart.push({
                name : slug,
                gty: 1,
                price: parseFloat(item.price),
                image: '/uploads/' + item._id + '/' + item.image
            });
        } else {
            var cart = req.session.cart ;
            var newItem = true ;
            for (var i = 0 ; i < cart.length; i++){
                if(cart[i].name == slug){
                    cart[i].qty++ ; 
                    newItem = false ;
                    break;
                }
            }

            if(newItem){
                cart.push({
                    name: slug,
                    qty: 1,
                    price: parseFloat(item.price),
                    image: '/uploads/' + item._id + '/' + item.image 
                })
            }

        }

        console.log(req.session.cart);
        req.flash('success','Product added!');
        res.redirect('back');
    })
});

router.get('/checkout',function(req, res){
    res.render('admin/checkout.ejs', {
        name: 'Checkout',
        cart: req.session.cart
    })
})



module.exports = router;