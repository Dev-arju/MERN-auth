import express from "express";
import multer from "multer";
import path from 'path'
import {
  adminAuth,
  regAdmin,
  dropAdmin,
} from "../controllers/adminController.js";
import {
  fetchUsers,
  deleteUser,
  changeUserStatus,
  addUser,
  updateUserInfo
} from "../controllers/userController.js";
import { adminControl } from "../middleware/authMiddleware.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name + '_' + Date.now()+ path.extname(file.originalname))
  }
})

const avatarUpload = multer({
  storage: storage
})

router.post("/login", adminAuth);
router.post("/create", regAdmin);
router.post("/drop", dropAdmin);
router.get("/users", adminControl, fetchUsers);
router.delete("/users/:id", adminControl, deleteUser);
router.patch("/users", adminControl, changeUserStatus);
router.post("/add-user", adminControl, avatarUpload.single('avatar'), addUser);
router.post('/update-user', adminControl, updateUserInfo)

export default router;
