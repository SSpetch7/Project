var mongoose = require('mongoose');

var CartSchema = new mongoose.Schema ({
    userID : String, 
    itemID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }
})
module.exports = mongoose.model('Cart',CartSchema);