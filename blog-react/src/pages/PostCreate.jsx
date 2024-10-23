import React, { useState } from "react";
import axios from "axios";
import '../styles/PostCreate.css'
import { useNavigate } from "react-router-dom";

const PostCreate = () => {
    const [formData, setFormData] = useState({title:'',content:''})
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const {value, name} = e.target;
        setFormData(prevData => ({...prevData, [name]:value}))
    }

    const CreatePost = async() => {
        try{
            const userId = localStorage.getItem('userId')
            const token = localStorage.getItem('token')
            if(!token){
                alert('Вы не авторизованы, чтобы создать пост вам нужно авторизоваться')
                return; // Stop execution if no token
            }

            // Include userId in the data
            const dataToSend = { ...formData, userId }; 

            const response = await axios.post(
                'http://127.0.0.1:8000/api/v1/posts/',
                dataToSend, // Send dataToSend
                {
                    headers: {
                        Authorization: `Token ${token}`, // Use the correct token format
                        'Content-type':'application/json'
                    }
                });

            if (response.status === 201) {
                alert('Вы успешно создали пост')
                navigate('/');
            } else {
                alert('Ошибка в создании поста')
            }

        } catch(error){
            console.error("Error creating post:", error);
            alert('Ошибка в создании поста')
        };
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        CreatePost(); // Call CreatePost directly
    }

    return(
        <div className="wrapper-create">
            <h1 className="h1-avtor">Написание поста</h1>
            <form onSubmit={handleSubmit} >
                <label className="post-create">Название:</label>
                    <input type="text" name='title' className="post-create" value={formData.title} onChange={handleInputChange} />
                <label className="post-create">Содержание:</label>
                    <input type="text" className="post-create" name='content' value={formData.content} onChange={handleInputChange}/>
                    <br></br>
                <button type="submit" className="post-create">Создать</button>
            </form>
            <br></br>
        </div>
    )
};

export default PostCreate;
