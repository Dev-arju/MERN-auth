import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user.isActive) {
        res.status(401)
        throw new Error('User has been blocked')
    }

    if(user && (await user.matchPassword(password)) ) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password')
    }
});

// @desc Register a new user
// route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if(userExists) {
        res.status(401);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }
    
});

// @desc Logout user
// route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', "", {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({message: 'User Logged out'})
});

// @desc Get user profile
// route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user)
});

// @desc Update user profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }

       const updatedUser = await user.save();
       res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email
       })
    } else {
        res.status(404);
        throw new Error('User not found')
    }
});

// @desc UsersList 
// route GET /admin/users
// @access private
const fetchUsers = asyncHandler(async (req, res) => {
    User.find().select('_id name email isActive')
    .then((docs) => {
        res.status(200).json({docs})
    })
    .catch(err => {
        res.status(404)
        throw new Error(err)
    })
})

// @desc Delete User
// route DELETE /admin/users/:id
// @access private
const deleteUser = asyncHandler(async (req, res) => {
    let userId = req.params.id
    User.deleteOne({_id: userId})
    .then(() => {
        console.log('user deleted');
        res.status(200).json({message: 'User deleted'})
    })
    .catch((err) => {
        console.log(err.message);
        res.status(404)
        throw new Error(err)
    })
})

// @desc Change User Status
// route PATCH /admin/users
// @access private

const changeUserStatus = asyncHandler(async(req, res) => {
    const { userId , currStatus} = req.body
    console.log(req.body);
    User.updateOne({_id: userId},{isActive: !currStatus})
    .then(() => {
        res.status(200);
        res.json({message: 'User status changed'})
    })
    .catch(err => {
        res.status(404);
        throw new Error(err?.message)
    })
})

// @desc Admin can create user without password
// route POST /admin/add-user
// @access private
const addUser = asyncHandler(async (req, res) => {
    console.log(req.file);
    console.log('call get');
    console.log(req.body);
    // const { name, email } = req.body
    // const exist = email !== "" ? await User.findOne({ email }) : false
    // if(exist) {
    //     res.status(404);
    //     throw new Error('Email already exists')
    // }
    // if( name !== "" && email !== "" ){
    //     const user = await User.create({
    //         name,
    //         email
    //     })
    //     if (user) {
    //         res.status(200).json({
    //             _id: user._id,
    //             name: user.name,
    //             email: user.email
    //         })
    //     } else {
    //         res.status(404)
    //         throw new Error('Error while creating user')
    //     }
    // } else {
    //     res.status(404)
    //     throw new Error('not get input data')
    // }
})

// @desc Update Profile for admin
// route POST /admin/update-user
// @access private
const updateUserInfo = asyncHandler( async (req,res) => {
    const { userId, name, email } = req.body

    const update = {};
    const filter = {_id: userId}
    if (name !== ""){
        update.name = name
    }
    if (email !== "") {
        update.email = email
    }


    User.updateOne(filter, update)
    .then(() => {
        res.status(200).json({message: 'user updated'})
    })
    .catch(err => {
        res.status(404)
        throw new Error(err.message)
    })
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    fetchUsers,
    deleteUser,
    changeUserStatus,
    addUser,
    updateUserInfo
}