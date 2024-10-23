

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom"; 
import '../../styles/post_dateil.css'
import Header from "../header";
function PostDetails() {
  const { postId } = useParams(); 
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/posts/${postId}`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        setPost(response.data);

        const response_comments = await axios.get(
          `http://127.0.0.1:8000/api/v1/posts/${postId}/comments`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );

        if (Array.isArray(response_comments.data.results)) {
          setComments(response_comments.data.results);
        } else {
          console.error(
            "Expected array of comments, but received object:",
            response_comments.data
          );
        }
      } catch (error) {
        console.error("Error fetching post or comments!", error);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  return (
    <div>
      <Header/>
    <div className="post-details">
      <h1>Название:{post.title}</h1>
      <p>Содeржимое:{post.content}</p>
      

      {post.autor_info && (
        <p>Автор: {post.autor_info.username}</p>
      )} 

      <p>Дата создания:{new Date(post.created_at).toLocaleDateString()}</p>
      <p>Дата последнего обновления:{new Date(post.updated_at).toLocaleDateString()}</p>
      <div className="like-count"> 
        <span className="like-number">{post.like_count}</span>
        <span className="like-icon">❤️️</span>  
      </div>

   
      <h4>Комментарии:</h4>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <div>
              <strong>
                {comment.user_info?.username || "Anonymous"}
              </strong>
            </div>
            <div>Контент: {comment.content}</div>
            <div>
              Создано:{" "}
              {new Date(comment.date_of_create).toLocaleDateString()}
            </div>
            <div className="like-count"> 
        <span className="like-number">{comment.like_count}</span>
        <span className="like-icon">❤️️</span>  
      </div>
          </li>
        ))}
      </ul>
      <Link to="/">Back to List</Link>
    </div>
    </div>
  );
}

export default PostDetails;