const express = require('express');
const{ CheckoutCart, IPNDestination, PaymentSuccessReturnUrl, PaymentCancelReturnUrl }= require('../controllers/yanepayController');
  const router = express.Router();
  router.route('/CheckoutCart')
    .post(CheckoutCart);
    router.route('/IPNDestination')
    .post(IPNDestination);
    router.route('/PaymentSuccessReturnUrl')
    .get(PaymentSuccessReturnUrl);
    router.route('/PaymentCancelReturnUrl')
    .get(PaymentCancelReturnUrl);
     module.exports = router;