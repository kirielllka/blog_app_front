import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [likeStatus, setLikeStatus] = useState(false); // State for like status

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/posts/${id}`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        setPost(response.data);

        const userId = localStorage.getItem('userId');
        
        console.log(typeof likes)
      } catch (error) {
        console.error("Error fetching post", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/posts/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type':'application/json',
          },
        }
      );
  
      setPost(response.data);
      setLikeStatus(true); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/v1/posts/${id}/like`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setPost(response.data);
      setLikeStatus(false); 
    } catch (error) {
      console.error("Error disliking post", error);
    }
  };

  return (
    <div>
      <div className="post-details">
        <h1>{post.title}</h1>
        <p>{post.content}</p>

        {post.autor_info && (
          <p>Автор:<Link to={`/profile/${post.autor_info.id}`}>{post.autor_info.username}</Link></p>
        )}

        <p>Дата создания: {new Date(post.created_at).toLocaleDateString()}</p>
        <p>
          Дата последнего обновления:{" "}
          {new Date(post.updated_at).toLocaleDateString()}
        </p>
        <div className="like-count">
          <span className="like-number">{post.like_count}</span>
          <span className="like-icon">❤️️</span>
          {likeStatus ? (
            <button onClick={handleDislike}>Убрать лайк</button>
          ) : (
            <button onClick={handleLike}>Лайк</button>
          )}
        </div>
        <Link to="/">Back to List</Link>
      </div>
    </div>
  );
}

export default PostDetails;