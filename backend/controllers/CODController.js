const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const COD = require("../models/COD");
const sendToken = require("../utils/sendToken");

exports.AddCOD = asyncErrorHandler(async (req, res, next) => {
    const { deliveredBy, deliveredByTO, orderId, amount } = req.body;
    const cod = await COD.create({
        deliveredBy, 
        deliveredByTO,
        orderId,
        amount
    });
    
    res.status(200).json({
        cod
    });

});
