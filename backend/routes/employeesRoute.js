const express = require('express');
const { getAllEmployees, getEmployees, getAdminEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployeeDetails } = require('../controllers/employeesController');
const { getAllProducts, getProductDetails, updateProduct, deleteProduct, getProductReviews, deleteReview, createProductReview, createProduct, getAdminProducts, getProducts } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/employees').get(getAllEmployees);
router.route('/employees/all').get(getEmployees);

router.route('/admin/employees').get(isAuthenticatedUser, authorizeRoles("admin"), getAdminEmployees);
router.route('/admin/employee/new').post(isAuthenticatedUser, authorizeRoles("admin"), createEmployee);
router.route('/employee/:id').get(getEmployeeDetails);
router.route('/admin/employee/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateEmployee)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteEmployee);

module.exports = router;