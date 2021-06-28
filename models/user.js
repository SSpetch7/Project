var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: {type: Boolean, default: false},
    cart: [
        {
            item_id : {
                type: String,
                required: true
            },
            item_image : {
                type: String,
                required: true
            },
            item_name : {
                type: String,
                required: true
            },
            item_qty : {
                type: Number,
                required: true
            },
            item_price: {
                type: Number,
                required: true
            },
            item_total : {
                type: Number,
                required: true
            }
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);