var mongoose = require('mongoose');

var itemShema = new mongoose.Schema({
    name: String,
    image: String,
    desc : String,
    price : String,
    comments : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

module.exports = mongoose.model('Item',itemShema);