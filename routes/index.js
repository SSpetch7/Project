var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    passport = require('passport'),
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

/* Register */ 
router.get('/register',function(req,res){
    res.render('register.ejs');
});
router.post('/register', function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/');
        });
    });
});



router.get('/login',function(req,res){
    res.render('login.ejs');
});
router.post('/login',passport.authenticate('local',
    {
    successRedirect: '/',
    failureRedirect: '/login'
    }), function(res,res){
});

router.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
});

module.exports = router;