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
    res.render('admin/new.ejs',{ name: name});
})

router.post('/add-category',function(req,res){
    req.checkBody('name','Name must have a value.').notEmpty();

    var name = req.body.name;
    var slug = name.replace(/\s+/g,'-').toLowerCase();
    var errors = req.validationErrors();

    if(errors){
        res.render('admin/new.ejs', {
            errors: errors,
            name : name
        });
    } else {
        Category.findOne({slug: slug}, function(err,category){
            if(category){
                req.flash('error','Category name exists, choose another.');
                res.render('admin/new.ejs',{name: name});
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

router.get('/edit-category/:id', function(req, res){
    Category.findById(req.params.id, function(err, category){
        if(err){
            console.log(err);
        } else {
            res.render('admin/edit.ejs', {name: category.name, id: category._id});
        }
    });
});


router.post('/edit-category/:id', function(req, res){
    req.checkBody('name','Name must have a value').notEmpty();

    var name = req.body.name;
    var slug = name.replace(/\s+/g, '-').toLowerCase();
    var id = req.params.id;

    var errors = req.validationErrors();

    if(errors){
        res.render('admin/edit.ejs', {errors: errors, name: name, id: id})
    } else {
        Category.findOne({slug: slug, _id:{'$ne':id}}, function(err, category){
            if(category){
                req.flash('error',"Category name exists, choose another.");
                res.render('admin/edit.ejs', {name: name, id: id})
            } else {
                Category.findById(id, function(err, category){
                    if(err){
                        console.log(err);
                    } else {
                        category.name = name ;
                        category.slug = slug ; 

                        category.save(function(err){
                            if(err){
                                console.log(err);
                            } else {
                                req.flash('success', 'Category edited!');
                                res.redirect('/admin/categories/edit-category/'+id);
                            }
                        })
                    }
                })
            }
        })
    }
});








module.exports = router;