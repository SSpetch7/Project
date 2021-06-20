var express = require('express'),
    router = express.Router(),
    Category = require('../models/category');

router.get('/',function(req,res){
    Category.find(function(err,categories){
        if(err){
            console.log(err);
        } else {
            res.render('admin/category.ejs',{categories: categories });
        }
    })
});

router.get('/add-category',function(req,res){
    var name = "";
    res.render('admin/add.ejs',{ name: name});
})

router.post('/add-category',function(req,res){
    req.checkBody('name','Name must have a value.').notEmpty();

    var name = req.body.name;
    var slug = name.replace(/\s+/g,'-').toLowerCase();
    var errors = req.validationErrors();

    if(errors){
        res.render('admin/add.ejs', {
            errors: errors,
            name : name
        });
    } else {
        Category.findOne({slug: slug}, function(err,category){
            if(category){
                req.flash('error','Category name exists, choose another.');
                res.render('admin/add.ejs',{name: name});
            } else {
                var category = new Category({
                    name: name,
                    slug: slug
                });

                category.save(function (err){
                    if(err){
                        console.log(err)
                    } 

                    req.flash('success','Category added!');
                    res.redirect('/admin/categories');
                    

                })
            }
        })
    }
})
module.exports = router;