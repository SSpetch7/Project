var mongoose = require('mongoose');

var collectionShema = new mongoose.Schema({
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

module.exports = mongoose.model('Collection',collectionShema);