import asyncHandler from 'express-async-handler'
import generateToken from '../utils/adminToken.js'
import Admin from '../models/adminModel.js'


// @desc Admin set token 
// route POST /admin/login
// @access public
export const adminAuth = asyncHandler( async (req, res) => {
    const { adminId , adminPass } = req.body

    const admin = await Admin.findOne({ adminId })

    if (admin &&  (await admin.matchPassword(adminPass))) {
        generateToken(res, admin._id)
        res.status(200).json({
            _id: admin._id,
            adminId: admin.adminId,
            email: admin.contactMail
        })
    } else {
        res.status(401)
        throw new Error('Invalid Credentials')
    }
})


// @desc Admin register
// route POST /admin/create
// @access --development
export const regAdmin = asyncHandler(async (req,res) =>{
    const { adminId, newPassword , email } = req.body

    const admin = await Admin.findOne({ adminId })

    if(!admin){
        await Admin.create({
            adminId: adminId,
            adminPassword: newPassword,
            contactMail: email
        })
        .then(doc => {
            res.status(200)
            res.json(doc)
        })
    } else {
        res.status(401)
        throw new Error("Duplicate Record")
    }
})


// @desc Logout clear tokens
// route POST /admin/drop
// @access authorized
export const dropAdmin = asyncHandler(async (req,res) => {
    res.cookie("adminJWT", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'Admin Session Out'})
})


