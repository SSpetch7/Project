const express = require('express');
const app = express();
const  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.use('/public',function(req,res,next){
    next();
});


var collection = [
    {name:'Iron man mk1'},
    {name:'Iron man mk2'},
    {name:'Iron man mk3'},
    {name:'Iron man mk4'}
]

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