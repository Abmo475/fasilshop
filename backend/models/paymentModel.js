const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    txnId: { // transaction number 
        type: String,
        required: true
    },
    orderId: { // the order 
        type: String,
        required: true
    },
    txnAmount: { // total amount
        type: String,
        required: true
    },
    gatewayName: { // gateway for type 
        type: String,
        required: true,
        default:"None"
    },
    paymentMode: {
        type: String,
        required: true
    },
    txnDate: {
        type: String,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        default:"PENNDING"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("Payment", paymentSchema);