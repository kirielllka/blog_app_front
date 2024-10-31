import React, { useState } from "react";
import "../styles/registration.css";
import axios from "axios";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Пароли не сопадают");
      return;
    }

    try {
      debugger
      const registerResponce = await axios.post(
        "http://localhost:8000/api/auth/users/",
        {
          'email': formData.email,
          'username': formData.name,
          'password': formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      window.location.href = "http://localhost:3000/login";
    } catch (error) {
      if (error.responce && error.responce.data) {
        alert("Error detail:" + JSON.stringify(error.responce.data));
      } else {
        alert("An unexpected error occured:" + error.message);
      }
      localStorage.removeItem("token");
    }
  };
  return (
<div className="cont">
  <div className="wrapper-reg">
    <h1 className="reg">Регистрация</h1>
    <form onSubmit={handleSubmit}>
      <div className="input-box">
        <input
          type="text"
          name="name"
          placeholder="Введите логин"
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-box">
        <input
          type="text"
          name="email"
          placeholder="Введите почту"
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-box">
        <input
          type="password"
          name="password"
          placeholder="Введите пароль"
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-box">
        <input
          type="password"
          name="confirmPassword"
          placeholder="Повторите пароль"
          onChange={handleChange}
          required
        />
      </div>
      <div className="button-container">
        <input
          type="submit"
          value="Зарегестрироваться"
          className="custom-button"
        />
      </div>
    </form>
    <div className="text">
      <h3>
        Уже зарегестрированы?<a href="/login">Войдите в аккаунт</a>
      </h3>
    </div>
  </div>
</div>

  );
};

export default RegistrationPage;
