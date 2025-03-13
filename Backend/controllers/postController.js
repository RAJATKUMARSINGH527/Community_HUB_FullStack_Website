// const Post = require("../models/Post");
// const upload = require('../utils/multer')

// //  Add a Comment to a Post

// exports.AddComment = async (req, res) => {
//     try {
//         const { postId } = req.params;
//         const { text } = req.body;
//         const userId = req.user.id; // Get user ID from auth middleware
//         console.log(userId)
//         console.log("user object:", req.user)
//         // Validate input
//         if (!text) {
//             return res.status(400).json({ message: "Comment text is required" });
//         }

//         // Find the post and push the new comment
//         const post = await Post.findById(postId);
//         if (!post) {
//             return res.status(404).json({ message: "Post not found" });
//         }

//         // Add new comment
//         post.comment.push({ user: userId, text });
//         await post.save();
//         const updatedPost = await Post.findById(postId)
//             .populate("user", "username")
//             .populate("comment.user", "username")

//         res.status(201).json({ message: "Comment added successfully", post: updatedPost });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// };

// exports.AddPost =  async (req, res) => {
//     try {
//         console.log("Request File:", req.file); // Debugging

//         if (!req.file) {
//             return res.status(400).json({ message: "No file uploaded" });
//         }
//         const { content, likes, comments } = req.body;
//         const userId = req.user.id
      
//         const mediaUrl = req.file ? req.file.path : null; // get Cloudinary URL
//         cmediaType = req.file.mimetype.startsWith('image') ? 'image' : 'video';

//         const newPost = new Post({
//             user: userId,
//             content,
//             mediaUrl: req.file.path, // Cloudinary URL
//             mediaType: req.file.mimetype.startsWith('image') ? 'image' : 'video',
//             likes, 
//             comments });
//         await newPost.save();
//         res.status(201).json({message:"post created successfully", post: newPost});
//     } catch (error) {
//         res.json({ message: 'server error ', error: error})
//     }
// };

// exports.getAllPost = async (req, res) => {
//     try {
//         const posts = await Post.find();
//         res.json(posts);
//     } catch (error) {
//         res.json({ message: 'server error ', error})
//     }
// };

// exports.getPostById = async(req, res)=>{
//     try {
//         const post = await Post.findById(req.params.id)
//         .populate('user', 'username')
//         .populate('comment.user', 'username')
//         if (!post){
//             return res.json({ message: "post not found"})
//         }
//         res.json(post)
//     } catch (error) {
//         res.json({ message: 'server error ', error})
//     }
// }

// exports.updatePost = async(req, res)=>{
//     try {
//         const post = await Post.findById(req.params.id);
//         if (!post) {
//             return res.status(404).json({ message: "Post not found" });
//         }
//         // Ensure `post.user` is defined before calling `.toString()`
//         if (!post.user) {
//             return res.status(400).json({ message: "User field is missing in this post" });
//         }
//         // Check if the logged-in user is the owner of the post
//         if (post.user.toString() !== req.user.id) {
//             return res.status(403).json({ message: "Unauthorized: You can only update your own posts" });
//         }

//         const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updatedPost)
//     } catch (error) {
//         res.json({ message: 'server error ', error:error.message})
//     }
// }

// exports.deletePost = async(req, res)=>{
//     try {
//         const post = await Post.findById(req.params.id);
//         if (!post) {
//             return res.status(404).json({ message: "Post not found" });
//         }

//         // Check if the logged-in user is the owner of the post
//         if (post.user.toString() !== req.user.id) {
//             return res.status(403).json({ message: "Unauthorized: You can only delete your own posts" });
//         }

//         await Post.findByIdAndDelete(req.params.id);
//         res.json({ message: "Post deleted successfully" });
//     } catch (error) {
//         res.json({ message: 'server error ', error: error.message})
//     }


// }


const Post = require("../models/Post");
const upload = require('../utils/multer');

// Add a Comment to a Post
exports.AddComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { text } = req.body;
        const userId = req.user.id; // Get user ID from auth middleware
        const username = req.user.username; // Get username from auth middleware

        // Validate input
        if (!text) {
            return res.status(400).json({ message: "Comment text is required" });
        }

        // Find the post and push the new comment
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Add new comment with username
        post.comments.push({ user: userId, username, text });
        await post.save();
        
        const updatedPost = await Post.findById(postId)
            .populate("user", "username")
            .populate("comments.user", "username");

        res.status(201).json({ message: "Comment added successfully", post: updatedPost });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Delete a Comment from a Post
exports.DeleteComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const userId = req.user.id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comment = post.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.user.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized: You can only delete your own comments" });
        }

        comment.remove();
        await post.save();

        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Add a Post
exports.AddPost = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const { content, likes, comments } = req.body;
        const userId = req.user.id;
        const username = req.user.username;

        const mediaUrl = req.file ? req.file.path : null; // Get Cloudinary URL
        const mediaType = req.file.mimetype.startsWith('image') ? 'image' : 'video';

        const newPost = new Post({
            user: userId,
            username,
            content,
            mediaUrl,
            mediaType,
            likes, 
            comments 
        });
        await newPost.save();
        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get All Posts
exports.getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "username").populate("comments.user", "username");
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get Post by ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("user", "username")
            .populate("comments.user", "username");
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update a Post
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        
        if (!post.user || post.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: You can only update your own posts" });
        }

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate("user", "username")
            .populate("comments.user", "username");
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a Post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: You can only delete your own posts" });
        }

        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
