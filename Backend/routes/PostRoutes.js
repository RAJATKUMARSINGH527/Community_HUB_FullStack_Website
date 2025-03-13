// const express = require('express')
// const upload = require('../utils/multer');
// const {
//     AddComment,
//     AddPost,
//     getAllPost,
//     getPostById,
//     updatePost,
//     deletePost,
// } = require("../controllers/postController");

// const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

// const router = express.Router();


// router.post('/upload',authMiddleware, upload.single('media'),AddPost);
// router.post("/:postId/comments", authMiddleware, AddComment);
// router.get('/',getAllPost);
// router.get('/:id',authMiddleware, getPostById);
// router.put('/:id',authMiddleware, updatePost);
// router.delete('/:id',authMiddleware, deletePost);

// module.exports = router;

const express = require('express');
const upload = require('../utils/multer');
const {
    AddComment,
    DeleteComment,
    AddPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost,
} = require("../controllers/postController");

const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Post Routes
router.post('/upload', authMiddleware, upload.single('media'), AddPost);
router.get('/', getAllPost);
router.get('/:id', authMiddleware, getPostById);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

// Comment Routes
router.post("/:postId/comments", authMiddleware, AddComment);
router.delete("/:postId/comments/:commentId", authMiddleware, DeleteComment);

module.exports = router;
