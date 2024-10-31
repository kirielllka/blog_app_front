import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/header.css'

const Header = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
}

    return(
        <header className="header">
            <h1 className="header-title">Блог</h1>
            <div className="header-actions">
                <Link to='/' className="button">
                    Посты
                </Link>
                <form className="search-form">
                    <input type="text" placeholder="Поиск" className="search-input"></input>
                    <button type="submit" className="search-button">искать</button>
                </form>
                <div className="user-actions">
                    {token ? (
                        <>
                        <Link to='/profile' className="icon-button">
                        Профиль
                        </Link>
                        <button type="submit" onClick={handleLogout} className="logout-button">Выйти из аккаунт</button>
                        </>
                    ): (
                        <Link to='/login' className="icon-button-login">Войти</Link>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header;