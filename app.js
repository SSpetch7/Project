var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    Collection = require('./models/collection'),
    Comment = require('./models/collection'),
    User = require('./models/user'),
    seedDB =require('./seeds');
// database
mongoose.connect('mongodb://localhost/BItem');
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

seedDB();

app.use(require('express-session')({
    secret: 'secret is always secret.',
    resave: false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user ;
    next();
})

/*CSS*/ 
app.use('/public',function(req,res,next){
    next();
});




/* render from database */ 

app.get('/home',function(req,res){
    Collection.find({},function(err, allItemList){
        if(err){
            console.log(err);
        }else {
            res.render("Home.ejs",{Collections: allItemList});
        } 
    });
});


app.post('/home',function(req,res){
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


/*app.get('/',function(req,res){
    res.render('Home.ejs');
});*/

//Static File( CSS )

app.use(express.static('public'))
app.use('/css',express.static(__dirname+'public/css'))

app.get('/',function(req,res){
    res.render('collections/collection.ejs');
});
app.get('/home/new',function(req,res){
    res.render('collections/new.ejs');
});
/* Show pic */
app.get('/home/:id',function(req,res){
    Collection.findById(req.params.id).populate('comments').exec(function(err, foundCollection){
        if(err){
            console.log(err);
        } else {
            res.render('collections/show.ejs',{home:foundCollection});
        }
    });
});
/* comment */
app.get('/home/:id/comments/new', function(req,res){
    Collection.findById(req.params.id, function(err,foundCollection){
        if(err){
            console.log(err);
        } else {
            res.render('comments/new.ejs',{home:foundCollection});
        }
    });
});

app.post('/home/:id/comments', function(req,res){
    Collection.findById(req.params.id, function(err, foundCollection){
        if(err){
            console.log(err);
            res.redirect('/home');
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else {
                    foundCollection.comments.push(comment);
                    foundCollection.save();
                    
                    res.redirect('/'+foundCollection._id);
                }
            })
        }
    })
})

/* Register */ 
app.get('/register',function(req,res){
    res.render('register.ejs');
});
app.post('/register', function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/home');
        });
    });
});



app.get('/login',function(req,res){
    res.render('login.ejs');
});
app.post('/login',passport.authenticate('local',
    {
    successRedirect: '/home',
    failureRedirect: '/login'
    }), function(req,res){
});


app.listen(3000,function(){
    console.log('SHOPERSHOPER is started.');
});
