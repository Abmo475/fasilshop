const mongoose = require('mongoose');

const CODSchema = new mongoose.Schema({
    deliveredBy:{
        type:String,
        required:true
    },
    deliveredByTO:{
        type:String,
        required:true
    },
    orderId: {
        type: String,
        required: true
    },
     amount: {
        type: String,
        required: true
    }  ,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Cod", CODSchema);