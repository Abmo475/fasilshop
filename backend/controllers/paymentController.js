const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/paymentModel');
const ErrorHandler = require('../utils/errorHandler');
exports.processPayment = asyncErrorHandler(async (req, res) => {

    try{  
        addPayment(req.body);  
    res.status(200).json({
        message:"Done"
        });
    }catch(error){
        console.log(error);
    }
});
 
const addPayment = async (data) => {
    try {
        await Payment.create(data);
        console.log("Payment Done!");
    } catch (error) {
        console.log("Payment Failed!");
    }
}
exports.getPaymentStatus = asyncErrorHandler(async (req, res, next) => {

    const payment = await Payment.findOne({ orderId: req.params.id });

    if (!payment) {
        return next(new ErrorHandler("Payment Details Not Found", 404));
    }
    const txn = {
        id: payment.txnId,
        status: payment.status,
    }

    res.status(200).json({
        success: true,
        txn,
    });
});
