var mongoose = require('mongoose');

var Collection =require('./models/item');
var Comment =require('./models/comment');

var data = [
    {
        name:'Go to the doi',
        image: 'https://pbs.twimg.com/media/EqyZb0_W4AAkmqt?format=jpg&name=large',
        desc : 'xxxxxxxxxx',
        price : '500 ฿'
    },
    {
        name:'Go to the moon',
        image: 'https://pbs.twimg.com/media/EqyZb0_W4AAkmqt?format=jpg&name=large',
        desc : 'xxxxxxxxxx',
        price : '200 ฿'
    },
    {
        name:'Go to the ...',
        image: 'https://pbs.twimg.com/media/EqyZb0_W4AAkmqt?format=jpg&name=large',
        desc : 'xxxxxxxxxx',
        price : '700 ฿'
    },
];

function seedDB(){
    Collection.remove({}, function(err){
        if(err) {
            console.log(err);
        }
        console.log('Remove DB completed');
        data.forEach(function(seed){
            Collection.create(seed, function(err, collection){
                if(err){
                    console.log(err);
                }else {
                    console.log('New data added');
                    // Comment.create(
                    // {
                    //     author : 'PetchJA',
                    //     text : "MAI NAAAAAAAAAA"
                    // }, function(err, comment){
                    //     if(err){
                    //         console.log(err);
                    //     }else {
                    //         collection.comments.push(comment);
                    //         collection.save();
                    //     }
                    // });
                }
            });
        });
    });
}
module.exports = seedDB;