const mongoose = require('mongoose');

var detailsSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: 'This field is required.'
    },
   
    address: {
        type:  String
    },
    ID: {
        type: Number
    }
});


mongoose.model('Details', detailsSchema);