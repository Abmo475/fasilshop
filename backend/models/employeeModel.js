const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
    },
    gender: {
        type: String,
        required: [true, "Please Enter Gender"]
    },
    phoneNo: {
        type: Number,
        required: true,
        minLength: [10, "Password should have atleast 8 chars"],
    },
    dob: {
        type: Date,
        required: true
    },
    eductionalLevel: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should have atleast 8 chars"],
        select: false,
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,   
        required: true
    },
    salary:{
        type: Number,   
        required: true 
    },
    State: {
        type: String,
        required: true
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    role: {
        type: String,
        default: "employee",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

employeeSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

employeeSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

employeeSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

employeeSchema.methods.getResetPasswordToken = async function () {

    // generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // generate hash token and add to db
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model('Employee', employeeSchema);