import { useState, useEffect } from "react";
import moment from "moment";
import "./Dashboard.css";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [editingPost, setEditingPost] = useState(null);
  const [editText, setEditText] = useState("");
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [visibleComments, setVisibleComments] = useState({});
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/posts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setPosts(data || []);
      //   alert("Posts fetched successfully!");
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  const handleLike = async (postId) => {
    try {
      await fetch(`http://localhost:5000/posts/${postId}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLikedPosts((prevLiked) => {
        const newLiked = new Set(prevLiked);
        newLiked.has(postId) ? newLiked.delete(postId) : newLiked.add(postId);
        return newLiked;
      });
      fetchPosts();
      alert("Post liked successfully!");
    } catch (err) {
      console.error("Failed to like post", err);
    }
  };

  const handleComment = async (postId) => {
    if (!commentText[postId]?.trim()) return;
    try {
      await fetch(`http://localhost:5000/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ text: commentText[postId] }),
      });
      setCommentText((prev) => ({ ...prev, [postId]: "" }));
      fetchPosts();
      alert("Comment added successfully!");
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await fetch(`http://localhost:5000/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchPosts();
      alert("Post deleted successfully!");
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    console.log("Deleting comment:", postId, commentId); // Debugging
  
    try {
      const response = await fetch(
        `http://localhost:5000/posts/${postId}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      const contentType = response.headers.get("content-type");
  
      if (!response.ok) {
        let errorMessage = "Error deleting comment";
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          const errorText = await response.text(); // Capture HTML error if any
          console.error("Server response:", errorText);
          errorMessage = "Server error, check logs";
        }
        alert(errorMessage);
        return;
      }
  
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: post.comments.filter((c) => c._id !== commentId) }
            : post
        )
      );
  
      alert("Comment deleted successfully!");
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };
  

  const toggleComments = (postId) => {
    setVisibleComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div className="dashboard">
      <h2>Community Posts</h2>
      <div className="posts-container">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="post-header">
                {post.userId?.toString() === userId?.toString() && (
                  <div className="icon-container">
                    <button
                      className="edit-post"
                      onClick={() => setEditingPost(post._id)}
                    >
                      ✏️
                    </button>
                    <button
                      className="delete-post"
                      onClick={() => handleDelete(post._id)}
                    >
                      ❌
                    </button>
                  </div>
                )}
              </div>

              {post.mediaUrl && post.mediaType === "image" && (
                <img
                  src={post.mediaUrl}
                  alt="Post media"
                  className="post-image"
                />
              )}

              <h3 className="post-title">{post.caption || post.title}</h3>

              {editingPost === post._id ? (
                <div className="edit-section">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => handleEdit(post._id)}>Save</button>
                </div>
              ) : (
                <p>{post.caption || post.content}</p> // Show old caption when not editing
              )}

              <small>{moment(post.createdAt).fromNow()}</small>

              <div className="post-actions">
                <button onClick={() => handleLike(post._id)}>
                  {likedPosts.has(post._id) ? "❤️ Liked" : "🤍 Like"}{" "}
                  {post.likes || 0}
                </button>
                <button onClick={() => toggleComments(post._id)}>
                  {visibleComments[post._id]
                    ? "Hide Comments"
                    : "Show Comments"}
                </button>
              </div>

              {visibleComments[post._id] && (
                <div className="comments-section">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentText[post._id] || ""}
                    onChange={(e) =>
                      setCommentText({
                        ...commentText,
                        [post._id]: e.target.value,
                      })
                    }
                  />
                  <button onClick={() => handleComment(post._id)}>OK</button>
                  <h4>Comments💭:</h4>
                  <ul>
                    {post.comment?.length > 0 ? (
                      post.comment.map((comment) => (
                        <li key={comment._id} className="comment-item">
                          <div className="comment-content">
                            <span>{comment.text}</span>
                            {comment.userId?.toString() ===
                              userId?.toString() && (
                              <div className="icon-container">
                                <button
                                  className="delete-comment"
                                  onClick={() =>
                                    handleDeleteComment(post._id, comment._id)
                                  }
                                >
                                  ❌
                                </button>
                              </div>
                            )}
                          </div>
                        </li>
                      ))
                    ) : (
                      <p>No comments yet</p>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
