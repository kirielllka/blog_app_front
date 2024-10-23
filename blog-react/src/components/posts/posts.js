import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/posts.css";
import {Link} from 'react-router-dom'
import Header from "../header";
const Posts = () => {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/posts/",
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          console.error("Expected array, but received object:", response.data);
        }
      } catch (error) {
        console.error("Error fetching posts!", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <Header/>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="post">
            <Link to={`posts/${post.id}`}>
            <div>Название: {post.title}</div>
            <div>Контент: {post.content}</div>
            <div>Автор: {post.autor_info.username}</div>
            <div>Создано: {new Date(post.created_at).toLocaleDateString()}</div>
            <div>
              Категория:{post.categories_display.map((category) => category.name).join(",")}
            </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
