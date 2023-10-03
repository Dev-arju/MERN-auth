import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const adminSchema = mongoose.Schema({
    adminId: {
        type: String,
        unique: true,
        required: true
    },
    adminPassword: {
        type: String,
        required: true
    },
    contactMail: {
        type: String,
    }
})

adminSchema.pre('save', async function (next){
    if (!this.isModified){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.adminPassword = await bcrypt.hash(this.adminPassword, salt)
})

adminSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.adminPassword)
}



const Admin = mongoose.model("Admin", adminSchema)
export default Admin;