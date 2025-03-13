import React, { useState } from "react";
import "./CreatePost.css"; // Import CSS

const CreatePost = () => {
  const [content, setContent] = useState(""); // Post content
  const [media, setMedia] = useState(null); // Image file
  const [preview, setPreview] = useState(null); // Image preview

  // Handle file change & show preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMedia(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  // Handle post submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return alert("Post content cannot be empty!");

    const formData = new FormData();
    formData.append("content", content);
    if (media) {
      formData.append("media", media);
    }

    try {
      const response = await fetch("https://community-hub-fullstack-website.onrender.com/posts/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || "Error creating post");

      alert("Post created successfully!");
      console.log(data);

      // Reset form
      setContent("");
      setMedia(null);
      setPreview(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create a Post</h2>
      {/* Post Form */}
      <form onSubmit={handleSubmit} className="create-post-form">
        <textarea
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />

        {/* Show image preview if selected */}
        {preview && <img src={preview} alt="Preview" className="image-preview" />}

        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
