import {
  useEffect,
  useState
} from "react";

import {
  Link,
  useParams
} from "react-router-dom";

import { http }
from "../api/http";

export default function UserDetailsPage() {

  const { id } =
    useParams();

  const [data, setData] =
    useState<any>(null);

  async function loadUser() {

    const res =
      await http.get(
        `/admin/users/${id}`
      );

    setData(
      res.data
    );

  }

  useEffect(() => {

    loadUser();

  }, [id]);

  async function blockUser() {

    if (
      !window.confirm(
        "Заблокировать пользователя?"
      )
    ) {
      return;
    }

    await http.post(
      `/admin/users/${id}/block`
    );

    loadUser();

  }

  async function unblockUser() {

    if (
      !window.confirm(
        "Разблокировать пользователя?"
      )
    ) {
      return;
    }

    await http.post(
      `/admin/users/${id}/unblock`
    );

    loadUser();

  }

  if (!data) {

    return <p>Загрузка...</p>;

  }

  const totalShirts =
    data.shirts.length;

  const activeShirts =
    data.shirts.filter(
      (shirt: any) =>
        shirt.state === "claimed"
    ).length;

  const blockedShirts =
    data.shirts.filter(
      (shirt: any) =>
        shirt.state === "blocked"
    ).length;

  return (

    <div className="page">

      <Link to="/adm/users">
        ← К пользователям
      </Link>

      <br />
      <br />

      <h1>
        {data.user.email}
      </h1>

      <p>

        Статус:{" "}

        <strong
          style={{
            color:
              data.user.status === "active"
                ? "#16a34a"
                : "#dc2626"
          }}
        >
          {data.user.status === "active"
            ? "Активен"
            : "Заблокирован"}
        </strong>

      </p>

      {data.user.status === "active" ? (

        <button
          className="danger-button"
          onClick={blockUser}
        >
          Заблокировать
        </button>

      ) : (

        <button
          className="primary-button"
          onClick={unblockUser}
        >
          Разблокировать
        </button>

      )}

      <br />
      <br />

      <div className="card">

        <h2>
          Статистика пользователя
        </h2>

        <p>
          Всего футболок:
          {" "}
          <strong>
            {totalShirts}
          </strong>
        </p>

        <p>
          Активированных:
          {" "}
          <strong>
            {activeShirts}
          </strong>
        </p>

        <p>
          Заблокированных:
          {" "}
          <strong>
            {blockedShirts}
          </strong>
        </p>

      </div>

      <br />

      <h2>
        Футболки
      </h2>

      {data.shirts.map(
        (shirt: any) => (

          <div
            key={shirt.id}
            className="card"
            style={{
              marginBottom: 12
            }}
          >

            <Link
              to={`/adm/shirts/${shirt.id}`}
            >
              {shirt.public_id}
            </Link>

            {" — "}

            <span
              style={{
                color:
                  shirt.state === "claimed"
                    ? "#16a34a"
                    : shirt.state === "blocked"
                    ? "#dc2626"
                    : "#ea580c",
                fontWeight: "bold"
              }}
            >
              {
                shirt.state === "claimed"
                  ? "Активирована"
                  : shirt.state === "blocked"
                  ? "Заблокирована"
                  : "Не активирована"
              }
            </span>

            <br />

            Сканов: {shirt.scans}

          </div>

        )
      )}

    </div>

  );

}