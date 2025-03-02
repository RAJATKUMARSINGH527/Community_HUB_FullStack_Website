const mongoose = require("mongoose");


const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User who commented
    text: { type: String, required: true }, // Comment content
    createdAt: { type: Date, default: Date.now } // Timestamp
});


const PostSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true },
    mediaUrl: { type: String },  // Store Cloudinary URL for image/video
    mediaType: { type: String, enum: ['image', 'video'], required: false }, // 'image' or 'video'
    content: { type: String  },
    likes: { type: Number, default: 0 },
    comment : [CommentSchema]
}, { versionKey: false});

module.exports = mongoose.model("Post", PostSchema);