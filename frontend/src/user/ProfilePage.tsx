import {
  useEffect,
  useState
} from "react";

import { http }
from "../api/http";

export default function ProfilePage() {

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {

    const token =
      localStorage.getItem(
        "userToken"
      );

    http
      .get(
        "/api/auth/me",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )
      .then((res) =>
        setUser(
          res.data
        )
      );

  }, []);

  if (!user) {
    return <p>Загрузка...</p>;
  }

  return (

    <div className="page">

      <h1 className="page-title">
        Профиль
      </h1>

      <div className="card">

        <p>
          <strong>Email:</strong>
          {" "}
          {user.email}
        </p>

        <p>
          <strong>Статус:</strong>
          {" "}
          {user.status}
        </p>

        <p>
          <strong>Дата регистрации:</strong>
          {" "}
          {new Date(
            user.created_at
          ).toLocaleString()}
        </p>

      </div>

    </div>

  );

}