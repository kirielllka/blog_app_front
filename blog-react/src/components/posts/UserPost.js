import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link, useParams} from 'react-router-dom'
import '../../styles/Profile.css'
const UserPosts = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/posts/?autor=${id}`,
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
  }, [id]); 


  return (
    <div>
      <h2>Посты данного пользователя <span>Изменить профиль</span></h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="post-user-card">
            <Link to={`../posts/${post.id}`} className="no-underline">
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
    </div>
  );
};


export default UserPosts;
