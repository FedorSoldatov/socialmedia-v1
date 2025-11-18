import { useState } from "react";
import Login from "./Login";
import { supabase } from "./supabase";
import { useEffect } from "react";
import Profile from "./Profile";

export default function Gate({ onSession }) {
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(true);
  // один раз
  useEffect(() => {
    let stop = () => {};

    async function start() {
      setLoading(start);
      const { data } = await supabase.auth.getSession();
      //отправить сессиюв
      onSession(data.session);
      setLoading(false);

      setSession(data.session);

      const { data: sub } = await supabase.auth.onAuthStateChange(
        (event, newSession) => {
          setSession(newSession);
          onSession(newSession);
        }
      );
      stop = () => sub.subscription.unsubscribe();
    }
    start();

    console.log(session);
    return () => stop();
  }, []);
  ///////////////////////////////////////////////////////////////
  //получаем текущую сессию
  useEffect(() => {
    async function createProfileNote() {
      await supabase.from("Accounts").upsert({
        id: session.user.id,
        email: session.user.email,
      });
    }
    if (session?.user) createProfileNote();
  }, [session]);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let content;
  if (session === undefined) {
    //окно "загрузка"
    content = <div>загрузка...</div>;
  } else if (session === null) {
    //показываем окно входа
    content = <Login session={session} />;
  } else {
    //показываем профиль
    content = <Profile session={session} />;
  }

  if (loading) return <div>загрузка....</div>;
  return null;
}
