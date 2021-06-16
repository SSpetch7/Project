var express  = require('express'),  
    router   = express.Router(),
    Item     = require('../models/item');

router.get('/', function(req,res, next){
    res.send(req.params);
})