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

var BItemlistShema = new mongoose.Schema({
    name: String,
    image: String,
    desc : String,
    price : String
});

var BItemcollection = mongoose.model('BItemcollection',BItemlistShema);

/*var collection = [
    {name:'Iron man mk1'},
    {name:'Iron man mk2'},
    {name:'Iron man mk3'},
    {name:'Iron man mk4'}
]*/

BItemcollection.create(
    {
        name : "Song of ice and fire",
        image:'https://2.bp.blogspot.com/-iELYwsxeMcw/TXZOc1xS21I/AAAAAAAADdA/xavYkka5eQo/s400/ASoIaF%2B4%2Bbooks.JPG',
        desc:'The new editions should hit American bookstores',
        price:'12000'
    },
    function(err,itemlist){
        if(err){
            console.log(err);
        }else {
            console.log('New data added');
            console.log(itemlist);
        }
    }
)

app.get('/',function(req,res){
    res.render('Home.ejs');
});

//Static File( CSS )
app.use(express.static('public'))
app.use('/css',express.static(__dirname+'public/css'))

app.get('/collection',function(req,res){
    res.render('collection.ejs');
});

app.listen(3000,function(){
    console.log('uCollection is started.');
});