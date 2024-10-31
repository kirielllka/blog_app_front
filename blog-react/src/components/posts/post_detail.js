
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom"; 
import '../../styles/post_dateil.css'
import Header from "../header";


function PostDetails() {
  const { id } = useParams(); 
  const [post, setPost] = useState({});

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

      } catch (error) {
        console.error("Error fetching post", error);
      }
    };

    fetchPost();
  }, [id]);


  return (
    <div>
    <div className="post-details">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      

      {post.autor_info && (
        <p>Автор: {post.autor_info.username}</p>
      )} 

      <p>Дата создания:{new Date(post.created_at).toLocaleDateString()}</p>
      <p>Дата последнего обновления:{new Date(post.updated_at).toLocaleDateString()}</p>
      <div className="like-count"> 
        <span className="like-number">{post.like_count}</span>
        <span className="like-icon">❤️️</span>  
      </div>
      <Link to="/">Back to List</Link>
    </div>
    
    </div>
  );
}

export default PostDetails;