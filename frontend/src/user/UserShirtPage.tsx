import {
  useEffect,
  useState
} from "react";

import {
  Link,
  useParams
} from "react-router-dom";

import { http } from "../api/http";

export default function UserShirtPage() {

  const { publicId } =
    useParams();

  const [scans, setScans] =
    useState(0);

  const [url, setUrl] =
    useState("");

  const [
    currentUrl,
    setCurrentUrl
  ] = useState("");

  const [
    shirtState,
    setShirtState
  ] = useState("");

  useEffect(() => {

    const token =
      localStorage.getItem(
        "userToken"
      );

    http
      .get(
        `/api/shirts/${publicId}/stats`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )
      .then((res) =>
        setScans(
          res.data.scans
        )
      );

    http
      .get(
        `/api/shirts/${publicId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )
      .then((res) => {

        setCurrentUrl(
          res.data.url || ""
        );

        setUrl(
          res.data.url || ""
        );

        setShirtState(
          res.data.state || ""
        );

      });

  }, [publicId]);

  async function saveLink() {

    try {

      const token =
        localStorage.getItem(
          "userToken"
        );

      await http.put(
        `/api/shirts/${publicId}/link`,
        {
          url
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setCurrentUrl(
        url
      );

      alert(
        "Ссылка обновлена"
      );

    } catch {

      alert(
        "Ошибка изменения ссылки"
      );

    }

  }

  async function deleteLink() {

    try {

      const token =
        localStorage.getItem(
          "userToken"
        );

      await http.delete(
        `/api/shirts/${publicId}/link`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setCurrentUrl("");

      setUrl("");

      alert(
        "Ссылка удалена"
      );

    } catch {

      alert(
        "Ошибка удаления ссылки"
      );

    }

  }

  return (

    <div className="page">

      <Link
        to="/my-shirts"
        style={{
          textDecoration: "none"
        }}
      >
        ← Назад к футболкам
      </Link>

      <br />
      <br />

      <div className="card">

        <h1 className="page-title">
          {publicId}
        </h1>

        <p>

          Статус:{" "}

          <strong
            style={{
              color:
                shirtState === "claimed"
                  ? "#16a34a"
                  : shirtState === "blocked"
                  ? "#dc2626"
                  : "#ea580c"
            }}
          >
            {shirtState}
          </strong>

        </p>

        <p>
          Сканов:{" "}
          <strong>
            {scans}
          </strong>
        </p>

      </div>

      <br />

      {shirtState === "blocked" && (

        <>

          <div
            className="card"
            style={{
              borderColor:
                "#dc2626",
              background:
                "#fef2f2"
            }}
          >

            <strong
              style={{
                color:
                  "#dc2626"
              }}
            >
              🚫 Футболка заблокирована администратором
            </strong>

            <p>
              Изменение и удаление ссылки недоступно.
            </p>

          </div>

          <br />

        </>

      )}

      <div className="card">

        <h2>
          Текущая ссылка
        </h2>

        <p>
          {currentUrl
            ? currentUrl
            : "Ссылка не установлена"}
        </p>

      </div>

      <br />

      {shirtState !== "blocked" && (

        <div className="card">

          <h2>
            Изменить ссылку
          </h2>

          <input
            className="input"
            value={url}
            onChange={(e) =>
              setUrl(
                e.target.value
              )
            }
            placeholder="https://..."
          />

          <br />
          <br />

          <button
            className="primary-button"
            onClick={saveLink}
          >
            Сохранить ссылку
          </button>

          {" "}

          <button
            className="danger-button"
            onClick={deleteLink}
          >
            Удалить ссылку
          </button>

        </div>

      )}

    </div>

  );

}


