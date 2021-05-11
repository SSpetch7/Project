var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Collection = require('./models/collection'),
    seedDB =require('./seeds');
// database
mongoose.connect('mongodb://localhost/BItem');
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
seedDB();

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

app.get('/home/:id',function(req,res){
    Collection.findById(req.params.id).populate('comments').exec(function(err, foundCollection){
        if(err){
            console.log(err);
        } else {
            res.render('collections/show.ejs',{home:foundCollection});
        }
    });
});

app.listen(3000,function(){
    console.log('SHOPERSHOPER is started.');
});
