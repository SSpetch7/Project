var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
// database
mongoose.connect('mongodb://localhost/BItem');

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.use('/public',function(req,res,next){
    next();
});

var collectionShema = new mongoose.Schema({
    name: String,
    image: String,
    desc : String,
    price : String
});

var Collection = mongoose.model('Collection',collectionShema);

/*var collection = [
    {name:'Iron man mk1'},
    {name:'Iron man mk2'},
    {name:'Iron man mk3'},
    {name:'Iron man mk4'}
]*/
/*
Collection.create(
    {
        name : "Song of ice and fire",
        image:'https://2.bp.blogspot.com/-iELYwsxeMcw/TXZOc1xS21I/AAAAAAAADdA/xavYkka5eQo/s400/ASoIaF%2B4%2Bbooks.JPG',
        desc:'The new editions should hit American bookstores',
        price:'฿ 12000'
    },
    function(err,ItemList){
        if(err){
            console.log(err);
        }else {
            console.log('New data added');
            console.log(ItemList);
        }
    }
);
*/



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
    res.render('collection.ejs');
});
app.get('/home/new',function(req,res){
    res.render('new.ejs');
});

app.get('/home/:id',function(req,res){
    Collection.findById(req.params.id, function(err,foundCollection){
        if(err){
            console.log(err);
        } else {
            res.render('show.ejs',{home:foundCollection});
        }
    });
});
app.listen(3000,function(){
    console.log('SHOPERSHOPER is started.');
});
/*
Collection.remove({}, function(err){
    if(err){
        console.log(err);
    }
});*/