const User = require('../models/userModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const sendToken = require('../utils/sendToken');
const ErrorHandler = require('../utils/errorHandler');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
const Employee = require('../models/employeeModel');
 

// Register User
exports.registerEmployee = asyncErrorHandler(async (req, res, next) => {
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
         folder: "avatars",
         width: 150,
         crop: "scale",
     });

    const { name, email, gender, password,phoneNo,dob,eductionalLevel,address,city,state,role } = req.body;
    const employee = await Employee.create({
        name, 
        email, 
        gender,
        phoneNo,
        dob,
        eductionalLevel,
        address,
        password,
        city,
        state,
        Salary,
        role,
        avatar: {
           public_id: myCloud.public_id,
             url: myCloud.secure_url,
         },
    });
    res.status(200).json({
        message:employee
        });
    // sendToken(employee, 201, res);
    const user = await User.create({
        name, 
        email,
        gender,
        password,
        role:'employee',
        avatar: {
           public_id: myCloud.public_id,
             url: myCloud.secure_url,
         },
    });
   // sendToken(user, 201, res);
});
exports.getAdminEmployees = asyncErrorHandler(async (req, res, next) => {
    const employee = await Employee.find();
    res.status(200).json({
        success: true,
        employee,
    });
    localStorage.setItem('employees',employee)
});

