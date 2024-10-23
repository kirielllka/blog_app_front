import React, {useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/login.css'

const LoginPage = () => {
    const [formData, setFormData] = useState({password:'',username:''})
    const [failedAttempts, setFailedAttempts] = useState(0)
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const {value, name} = e.target;
        setFormData(prevData => ({...prevData, [name]:value}))
    }
    const handleError = (error) => {
        console.error(error)
        alert('Ошибка входа. Пожалуйста проверьте данные и попробуйте снова')
    };

    const loginUser = async() => {
        try {
            const responce = await axios.post('http://localhost:8000/api/auth/token/login/', formData,{
                headers: {'Content-Type':'application/json'}
            });
            const token = responce.data.auth_token;
            if (token){
                console.log('Login succesfull, Token received:', token);
                localStorage.setItem('token', token);
                setFailedAttempts(0);
                return token;
            };

        }catch (error){
            setFailedAttempts(prev => prev + 1)
            if (failedAttempts >=1) handleError(error)
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(formData)
        const token = await loginUser();
        if (token){
            alert('Вы успешно авторизовались')
            navigate('/');
        }
    };
    return (
        <div className="wrapper">
            <h1 className="h1-avtor">Авторизация</h1>
            <form onSubmit={handleSubmit} >
                <label className="login">Username:</label>
                    <input type="text" name='username' className="login" value={formData.username} onChange={handleInputChange} />
                <label className="login">Password:</label>
                    <input type="password" className="login" name='password' value={formData.password} onChange={handleInputChange}/>
                    <br></br>
                <button type="submit" className="login">Войти</button>
            </form>
            <br></br>
                <div className="register-link">
                    <p>Вы не зарегистрированы? <a href="/sign-in">Зарегистрироваться</a></p>
                </div>
        </div>
    )
};

export default LoginPage;