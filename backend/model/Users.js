import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    profile: { type: String, default: "" }
}, { timestamps: true })

const User = mongoose.model('User', userSchema, 'users')

export default User