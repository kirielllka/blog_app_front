import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Profile = () => {
    const { id } = useParams(); // Get the ID from the URL
    const [profile, setProfile] = useState({});
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/v1/profiles/${id}/user`,
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          );
          setProfile(response.data);
        } catch (error) {
          console.error("Ошибка при получении профиля:", error);
        }
      };
  
      fetchProfile(); 
    }, [id]); // Only run the effect when `id` changes
      return(
        <div className="profile-container">
            <h1>Профиль</h1>
            <div className="user-fullname">
                Полное имя:{profile.full_name}
            </div>
            <div className="user-birth">
                Дата рождения: {profile.user_birth_date ? profile.user_birth_date : 'Не установлено'}
            </div>
            <div className="user-age">
                Возраст:{profile.age ? profile.age : 'Не установлено'}
            </div>
        </div>
      )

}

export default Profile;