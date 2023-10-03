import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Admin from '../models/adminModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next()
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, invalid token')
        }
    } else {
        res.status(401);
        throw new Error('Not authorised, no token')
    }
})

const adminControl = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.adminJWT;

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
            req.admin = await Admin.findById(decoded.adminId).select('-adminPassword')
            next()
        } catch (error) {
            res.status(401);
            throw new Error('Invalid token')
        }
    } else {
        res.status(401);
        throw new Error('Not authorised, token expired')
    }
})


export { protect, adminControl }