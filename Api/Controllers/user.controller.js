const User = require('../Models/user.js')
const createError = require("../utilities/error");
const createSuccess = require('../utilities/success');

// Get All Users
const getAllUsers = async (req, res, next)=> {
    try { 
        const users = await User.find();
        next(createSuccess(200, 'All users', users)) 
    } catch (error) {
        next(createError(500, 'Internal Server Error!'))
    }
}

// Get User By Id
const getUserById = async (req, res, next)=> {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            next(createError(404, 'User Not Found'))
        }else{
            next(createSuccess(200, 'Single User', user));
        }
    } catch (error) {
        next(createError(500, 'Internal Server Error!'))
    }
}

module.exports = {
    getAllUsers,
    getUserById
}