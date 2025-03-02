const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true},
    email: { type: String, unique: true, required: true},
    password: { type: String,  required: true},
    role: { type: String, enum: ['Admin', 'user'], default: 'user'},
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, required: false },
    blocked: { type: Boolean, default: false }, // Blocked or not
    post: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post"}]
}, {  versionKey: false });

module.exports = mongoose.model("User", UserSchema);
