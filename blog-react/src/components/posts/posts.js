import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/posts.css";
import {Link} from 'react-router-dom'
import Header from "../header";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/posts/",
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          console.error("Ожидался массив, но получен объект:", response.data);
        }
      } catch (error) {
        console.error("Ошибка при получении постов:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Сброс ошибки перед отправкой

    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post(
        "http://localhost:8000/api/v1/posts/",
        {userId, title, content, categories},
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setPosts((prevPosts) => [...prevPosts, response.data]);
      setTitle("");
      setContent("");
      setCategories([]);
    } catch (error) {
      console.error("Ошибка при добавлении поста:", error);
      setError("Не удалось добавить пост. Пожалуйста, попробуйте еще раз.");
    }
  };

  return (
    <div>
      <Header/>
      <h2>Посты</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="post-card">
            <Link to={`posts/${post.id}`} className="no-underline">
              <div className="post-title">Название: {post.title}</div>
              <div className="post-content">Контент: {post.content}</div>
              <div className="post-author">
                Автор: {post.autor_info.username}
              </div>
              <div className="post-dates">
                Создано: {new Date(post.created_at).toLocaleDateString()}
                <br />
                Обновлено: {new Date(post.updated_at).toLocaleDateString()}
              </div>
              {post.categories_display &&
                post.categories_display.length > 0 && (
                  <div className="post-categories">
                    <strong>Категории:</strong>{" "}
                    {post.categories_display.map((category) => (
                      <span key={category.id} className="category-badge">
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}
            </Link>
          </li>
        ))}
      </ul>
      {/* Форма для добавления нового поста */}
      <form className="create-post" onSubmit={handleSubmit}>
        <div>
          <label>
            Название:
            <input
              className="create-post"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />{" "}
          </label>
        </div>
        <div>
          <label>
            Контент:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Добавить пост</button>
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      </form>
    </div>
  );
};

export default Posts;
