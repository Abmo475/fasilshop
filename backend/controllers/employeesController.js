const Product = require('../models/productModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const SearchFeatures = require('../utils/searchFeatures');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');
const Employee=require('../models/employeeModel')

// Get All Products
exports.getAllEmployees = asyncErrorHandler(async (req, res, next) => {

    const resultPerPage = 12;
    const employeeCount = await Product.countDocuments();
    // console.log(req.query);

    const searchFeature = new SearchFeatures(Employee.find(), req.query)
        .search()
        .filter();

    let employees = await searchFeature.query;
     

    searchFeature.pagination(resultPerPage);

    employees = await searchFeature.query.clone();

    res.status(200).json({
        success: true,
        employees,
        employeeCount,
  
    });
});

// Get All Products ---Product Sliders
exports.getEmployees = asyncErrorHandler(async (req, res, next) => {
    const employees = await Employee.find();

    res.status(200).json({
        success: true,
        employees,
    });
});

// Get All Products ---ADMIN
exports.getAdminEmployees = asyncErrorHandler(async (req, res, next) => {
    const employees = await Employee.find();

    res.status(200).json({
        success: true,
        employees,
    });
});

// Create Product ---ADMIN
exports.createEmployee = asyncErrorHandler(async (req, res, next) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
    });
    const avatar = {
        public_id: result.public_id,
        url: result.secure_url,
    };
    const employee = await Employee.create(req.body);

    res.status(201).json({
        success: true,
        employee
    });
});

// Update Product ---ADMIN
exports.updateEmployee = asyncErrorHandler(async (req, res, next) => {

    let employee = await Employee.findById(req.params.id);

    if (!employee) {
        return next(new ErrorHandler("Employee Not Found", 404));
    }
    if (req.body.avatar.length > 0) {
        await cloudinary.v2.uploader.destroy(employee.brand.avatar.public_id);
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatar",
        });
        
    }


    employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(201).json({
        success: true,
        employee
    });
});

// Delete Product ---ADMIN
exports.deleteEmployee = asyncErrorHandler(async (req, res, next) => {

    const employee = await Employee.findById(req.params.id);

    if (!employee) {
        return next(new ErrorHandler("Employee Not Found", 404));
    }
    await employee.remove();

    res.status(201).json({
        success: true
    });
});
exports.getEmployeeDetails = asyncErrorHandler(async (req, res, next) => {

    const employee = await Employee.findById(req.params.id);

    if (!employee) {
        return next(new ErrorHandler("Employee Not Found", 404));
    }

    res.status(200).json({
        success: true,
        employee,
    });
});

