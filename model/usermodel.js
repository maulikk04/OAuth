const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username : {
        type:String
    },

    googleid : {
        type:String
    },
    thumbnail : {
        type:String
    }

})

module.exports = mongoose.model('user',schema);