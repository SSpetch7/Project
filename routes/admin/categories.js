var express = require('express'),
    router = express.Router(),
    Category = require('../../models/category');

router.get('/',function(req,res){
    Category.find(function(err,categories){
        if(err){
            console.log(err);
        } else {
            res.render('admin/category',{categories: categories });
        }
    })
});

router.get('/add-category',function(req,res){
    var name = '';
    res.render('admin/add.ejs',{ name: name});
})

module.exports = router;