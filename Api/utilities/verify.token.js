const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET
const createError = require('./error');

// Token Verification
const verifyToken = (req, res, next)=> {
    const token = req.cookies.access_token;
    if(!token){
        next(createError(401, "You are not authenticated!"))
    }else{
        jwt.verify(token, jwtSecret, (err, user)=>{
            if(err){
                next(createError(403, 'Token is invalid'))
            }else{
                req.user = user
            }
            next();
        })
    }
}

// User verification
const verifyUser = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            next(createError(403, 'You are not authorized!'))
        }
    })
}

// Admin Verification
const verifyAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin){
            next();
        }else{
            next(createError(403, 'You are not authorized!'))
        }
    })
}

module.exports = {
    verifyToken,
    verifyUser,
    verifyAdmin
};