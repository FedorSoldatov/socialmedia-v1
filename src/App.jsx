import Gate from "./Gate";
import {
  BrowserRouter,
  Link,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./Home";
import Users from "./Users";
import { useState } from "react";
import Profile from "./Profile";
import Login from "./Login";
function App() {
  const [session, setSession] = useState(undefined);

  function Private() {
    if (session === undefined) return "Загрузка...";
    if (session === null) return <Navigate to="/login" replace />;
    return <Outlet />;
  }

  return (
    <div>
      <BrowserRouter>
        <Gate onSession={setSession} />

        <div>
          <nav>
            <Link to={"/"}>Домашняя</Link>
            <Link to={"/users"}>Пользователи</Link>
            <Link to={"/profile"}>Профиль</Link>
          </nav>

          <Routes>
            <Route path="/login" element={<Login session={session} />}></Route>

            <Route element={<Private />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/users" element={<Users />}></Route>
              <Route
                path="/profile"
                element={<Profile session={session} />}
              ></Route>
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;

//css красивая форма входа
//красивое письмо
//профиль стилизованный
//режим редактирования профиля
//
//
//
//
//
