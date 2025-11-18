import { supabase } from "./supabase";
import "./Profile.css";
import { useState } from "react";
import { useEffect } from "react";

export default function Profile({ session }) {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [fio, setFio] = useState("");
  const [age, setAge] = useState("");
  const [number, setNumber] = useState();
  useEffect(() => {
    async function loadData() {
      //получаем данные
      const { data } = await supabase
        .from("Accounts")
        .select("nickname, fio, phone, age")
        .eq("id", session.user.id);
      single();
      //передаем в стейты
      setAge(data.age);
      setFio(data.FIO);
      setNickname(data.nickname);
      setNumber(data.phone);
    }

    loadData();
  }, [session.user.id]); //при заходе в акк

  function Quit() {
    supabase.auth.signOut();
  }

  async function saveProfile() {
    setIsEditing(false);

    //отправит запрос на сервер

    const profile = {
      nickname: nickname,
      FIO: fio,
      age: age,
      phone: number,
    };

    const { data } = await supabase
      .from("Accounts")
      .update(profile)
      .eq("id", session.user.id);

      
    setAge(data.age);
    setFio(data.FIO);
    setNickname(data.nickname);
    setNumber(data.phone);

    if (error) {
      console.error(error);
    }
  }

  function changeProfile() {
    setIsEditing(true);
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {session.user.email?.charAt(0).toUpperCase() || "U"}
          </div>
          <h1 className="profile-title">Профиль</h1>
        </div>

        {isEditing ? (
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">ID пользователя</span>
              <span className="info-value">{session.user.id}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Ваша почта</span>
              <span className="info-value">{session.user.email}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Никнейм</span>
              <input
                onChange={(event) => {
                  setNickname(event.target.value);
                }}
                value={nickname}
                type="text"
                className="input-field"
                placeholder="Введите никнейм"
              ></input>
            </div>

            <div className="info-item">
              <span className="info-label">ФИО</span>
              <input
                onChange={(event) => {
                  setFio(event.target.value);
                }}
                value={fio}
                type="text"
                className="input-field"
                placeholder="Введите ФИО"
              ></input>
            </div>

            <div className="info-item">
              <span className="info-label">Возраст</span>
              <input
                onChange={(event) => {
                  setAge(event.target.value);
                }}
                value={age}
                type="number"
                className="input-field"
                placeholder="Введите возраст"
              ></input>
            </div>

            <div className="info-item">
              <span className="info-label">Номер телефона</span>
              <input
                onChange={(event) => {
                  setNumber(event.target.value);
                }}
                value={number}
                type="tel"
                className="input-field"
                placeholder="Введите номер телефона"
              ></input>
            </div>

            <div className="info-item">
              <span className="info-label">Статус</span>
              <span className="status-badge">Активен</span>
            </div>
          </div>
        ) : (
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">ID пользователя</span>
              <span className="info-value">{session.user.id}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Ваша почта</span>
              <span className="info-value">{session.user.email}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Никнейм</span>
              <span className="info-value">{nickname}</span>
            </div>

            <div className="info-item">
              <span className="info-label">ФИО</span>
              <span className="info-value">{fio}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Возраст</span>
              <span className="info-value">{age}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Номер телефона</span>
              <span className="info-value">{number}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Статус</span>
              <span className="status-badge">Активен</span>
            </div>
          </div>
        )}

        <div className="profile-actions">
          {isEditing ? (
            <button className="action-btn save-btn" onClick={saveProfile}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12L10 17L19 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Сохранить
            </button>
          ) : (
            <button className="action-btn edit-btn" onClick={changeProfile}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Изменить
            </button>
          )}
        </div>

        <button className="logout-btn" onClick={Quit}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 17L21 12L16 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 12H9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}

{
  /* <div className="profile-info">
          <div className="info-item">
            <span className="info-label">ID пользователя</span>
            <span className="info-value">{session.user.id}</span>
           </div>

          <div className="info-item">
            <span className="info-label">Email</span>
             <span className="info-value">{session.user.email}</span>
           </div>

          <div className="info-item">
           <span className="info-label">Никнейм</span>
            <span className="info-value"></span>
           </div>

           <div className="info-item">
            <span className="info-label">ФИО</span>
             <span className="info-value"></span>           </div>

          <div className="info-item">
           <span className="info-label">Номер телефона</span>            
           <span className="info-value"></span></div>
          <div className="info-item">
            <span className="info-label">Статус</span>
            <span className="info-value"></span>
                 


              <div className="profile-info">
          <div className="info-item">
            <span className="info-label">ID пользователя</span>
            <span className="info-value">{session.user.id}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Email</span>
            <span className="info-value">{session.user.email}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Никнейм</span>
            <input></input>
          </div>

          <div className="info-item">
            <span className="info-label">ФИО</span>
            <input></input>
          </div>

          <div className="info-item">
            <span className="info-label">Номер телефона</span>
            <input></input>
          </div>
          <div className="info-item">
            <span className="info-label">Статус</span>
            <span className="info-value"></span>
          </div>
              
   <button className="logot-btn " onClick={Quit}>
            Выйти из аккаунта
          </button>  */
}
