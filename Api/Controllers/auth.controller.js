const role = require('../Models/role.js');
const user = require('../Models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const createError = require('../utilities/error.js');
const createSuccess = require('../utilities/success.js');

// Activate dotenv
dotenv.config()
jwtSecret = process.env.JWT_SECRET;

// Register controller
const register = async (req, res, next)=> {
    try {
            const Role = await role.find({role: 'User'});
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const newUser = new user(
                { 
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userName: req.body.userName,
                    email: req.body.email,
                    password: hashPassword,
                    profileImage: req.body.profileImage,
                    isAdmin: false,
                    roles: Role
                }
            );
            await newUser.save();
            next(createSuccess(200, 'User Registered Successfully'))
    } catch (error) {
        next(createError(500, error))
    }
}

// Register as Admin controller
const registerAdmin = async (req, res, next)=> {
    try {
            const Role = await role.find({});               // Admin can register any time
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const newUser = new user(
                { 
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userName: req.body.userName,
                    email: req.body.email,
                    password: hashPassword,
                    profileImage: req.body.profileImage,
                    isAdmin: true,
                    roles: Role
                }
            );
            await newUser.save();
            next(createSuccess(200, 'Admin Registered Successfully'))
    } catch (error) {
        next(createError(500, 'Somtehing went wrong!'))
    }
}

// Login controller
const login = async (req, res, next)=> {
    try {
        // check email
        const User = await user.findOne({email: req.body.email})
        .populate('roles', 'role')
        if(!User){
            next(createError(404, 'User Not Found!'))
        }
        // check password
        const isPasswordCorrect = await bcrypt.compare(req.body.password, User.password);
        if(!isPasswordCorrect){
            next(createError(404, 'Password is incorrect'))
        }else{
            // Create Token
            const token = jwt.sign(
                {id: User._id, isAdmin: User.isAdmin, roles: User.roles},
                jwtSecret
            )
            // Send the Token in the cookie
            res.cookie('access_token', token, {httpOnly: true}).status(200).json({
                status: 200,
                message: 'Login Success!',
                data: User
            })
        }
    } catch (error) {
        next(createError(500, error))
    }
}

module.exports = {
    register,
    registerAdmin,
    login
}