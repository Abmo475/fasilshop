const express = require('express');
const { AddCOD } = require('../controllers/CODController');
const { processPayment, paytmResponse, getPaymentStatus } = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router();

router.route('/payment/process').post(processPayment);
// router.route('/stripeapikey').get(isAuthenticatedUser, sendStripeApiKey);

router.route('/payment/status/:id').get(isAuthenticatedUser, getPaymentStatus);
 

module.exports = router;