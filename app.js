const express = require('express');
const app = express();
const  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');


app.get('/',function(req,res){
    res.render('Home.ejs');
});

app.listen(3000,function(){
    console.log('uCollection is started.');
});