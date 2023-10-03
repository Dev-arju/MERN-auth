import jwt from 'jsonwebtoken'

const generateToken = (res, adminId) => {
    const token = jwt.sign({ adminId }, process.env.JWT_ADMIN_SECRET, {
        expiresIn: '7d'
    })

    res.cookie('adminJWT', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge:  7 * 24 * 60 * 60 * 1000
    })
}

export default generateToken