const express = require('express');
const { newOrder, getSingleOrderDetails, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrderDetails);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

router.route('/admin/orders').get(isAuthenticatedUser, getAllOrders);// authorizeRoles("admin"),

router.route('/admin/order/:id')
    .put(isAuthenticatedUser, updateOrder)///*,authorizeRoles("employee"), authorizeRoles("admin")*/
    .delete(isAuthenticatedUser, deleteOrder);//authorizeRoles("employee"), authorizeRoles("admin"),

module.exports = router;