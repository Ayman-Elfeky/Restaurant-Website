const role = require('../Models/role.js');
const user = require('../Models/user.js');
const bcrypt = require('bcrypt')

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
            res.status(200).send('User Registered Successfully!')
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

// Login controller
const login = async (req, res, next)=> {
    try {
        // check email
        const User = await user.findOne({email: req.body.email});
        if(!User){
            res.status(404).send('User Not Found!')
        }
        // check password
        const isPasswordCorrect = await bcrypt.compare(req.body.password, User.password);
        if(!isPasswordCorrect){
            res.status(404).send('Password is incorrect!')
        }else{
            res.status(200).send('Login Success!')
        }
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

module.exports = {
    register,
    login
}