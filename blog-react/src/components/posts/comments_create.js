import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/post_dateil.css"

const Comment = () => {
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [error, setError] = useState("");
    const [content, setContent] = useState("")

    useEffect(() => {
    const fetchComments = async () => {
        try {
            console.log(id)
          const response = await axios.get(
            `http://localhost:8000/api/v1/posts/${id}/comments/`,
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          );
          if (Array.isArray(response.data.results)) {
            setComments(response.data.results);
          } else {
            console.error("Ожидался массив, но получен объект:", response.data);
          }
        } catch (error) {
          console.error("Ошибка при получении поста:", error);
          setError("Не удалось загрузить пост.");
        }
    };
    fetchComments();
    }, [id]);
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(""); // Сброс ошибки перед отправкой

      try {
        const response = await axios.post(
        `http://localhost:8000/api/v1/posts/${id}/comments/`,
          {'post':id,'content':content },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        setComments((prevComments) => [...prevComments, response.data]);
        setContent("");
      } catch (error) {
        console.error("Ошибка при добавлении комментария:", error);
        setError("Не удалось добавить комментарий. Пожалуйста, попробуйте еще раз.");
      }
    };
    return (
      <div>
        <h2>Комментарии</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="comment-card">
              <div className="comment-title">Контент: {comment.content}</div>
              <div className="comment-author">Автор: {comment.user_info.username}</div>
              <div className="comment-dates">
                Создано: {new Date(comment.date_of_create).toLocaleDateString()}
                <br />
                Обновлено: {new Date(comment.date_of_edit).toLocaleDateString()}
              </div>
              <div className="comment-likes">
                <span className="likes-icon">❤️</span> {/* Иконка лайка */}
                <span>{comment.like_count} лайков</span>{" "}
                {/* Количество лайков */}
              </div>
            </li>
          ))}
        </ul>
        <form className="create-comm" onSubmit={handleSubmit}>
          <div>
            <label>
              Текст:
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Добавить комментарий</button>
          {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        </form>
      </div>
    );


}
export default Comment