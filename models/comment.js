var mongoose = require('mongoose');

var commentShema = new mongoose.Schema({
    author = String,
    text : String
});

module.exports = mongoose.model('Comment',commentShema);