import { useState } from "react";
import { supabase } from "./supabase";
export default function Login({ session }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  function handleSignIn() {
    supabase.auth.signInWithPassword({ email, password });
  }
  function handleSignUp(event) {
    event.preventDefault(); //отменить обновление сайта
    supabase.auth.signUp({ email, password }); //просим зарегать акк в БД
    console.log("в момент регистрации сессия - " + session);
  }
  return (
    <div className="login-container">
      <h1>Вход/Регистрация</h1>
      <form onSubmit={handleSignUp}>
        <input
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="email"
          type="email"
        ></input>
        <input
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="password"
          type="password"
        ></input>
        <button onClick={handleSignIn}>Sign In</button>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
