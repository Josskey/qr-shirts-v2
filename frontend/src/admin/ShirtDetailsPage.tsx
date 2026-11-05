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

export default function ShirtDetailsPage() {

  const { id } =
    useParams();

  const [shirt, setShirt] =
    useState<any>(null);

  const [url, setUrl] =
    useState("");

  const qrUrl =
  `${import.meta.env.VITE_API_URL}/admin/shirts/${id}/qr`;

const qrDownloadUrl =
  `${import.meta.env.VITE_API_URL}/admin/shirts/${id}/qr/download`;
  
  async function loadShirt() {

    const res =
      await http.get(
        `/admin/shirts/${id}`
      );

    setShirt(
      res.data
    );

    setUrl(
      res.data.current_url || ""
    );

  }

  useEffect(() => {

    loadShirt();

  }, [id]);

  async function blockShirt() {

    if (
      !window.confirm(
        "Заблокировать футболку?"
      )
    ) {
      return;
    }

    await http.post(
      `/admin/shirts/${id}/block`
    );

    loadShirt();

  }

  async function unblockShirt() {

    if (
      !window.confirm(
        "Разблокировать футболку?"
      )
    ) {
      return;
    }

    await http.post(
      `/admin/shirts/${id}/unblock`
    );

    loadShirt();

  }

  async function saveLink() {

    await http.put(
      `/admin/shirts/${id}/link`,
      {
        url
      }
    );

    loadShirt();

  }

  async function deleteLink() {

    if (
      !window.confirm(
        "Удалить ссылку?"
      )
    ) {
      return;
    }

    await http.delete(
      `/admin/shirts/${id}/link`
    );

    loadShirt();

  }

  async function unassignShirt() {

    if (
      !window.confirm(
        "Отвязать футболку от владельца?"
      )
    ) {
      return;
    }

    await http.post(
      `/admin/shirts/${id}/unassign`
    );

    loadShirt();

  }

  async function regenerateClaimCode() {

  if (
    !window.confirm(
      "Сгенерировать новый claim-код?"
    )
  ) {
    return;
  }

  const res =
    await http.post(
      `/admin/shirts/${id}/regenerate-claim`
    );

  setShirt((prev: any) => ({
    ...prev,
    claim_code: res.data.claimCode
  }));

}


  if (!shirt) {

    return <p>Загрузка...</p>;

  }
  

  return (
    

    <div className="page">

      <Link to="/adm/shirts">
        ← К футболкам
      </Link>

      <br />
      <br />

      <h2
  style={{
    fontSize: 30,
    marginBottom: 16,
    wordBreak: "break-all"
  }}
>
  {shirt.public_id}
</h2>

<div className="card">

  <p>

    Статус:{" "}

    <strong
      style={{
        color:
          shirt.state === "claimed"
            ? "#16a34a"
            : shirt.state === "blocked"
            ? "#dc2626"
            : "#ea580c"
      }}
    >
      {shirt.state}
    </strong>

  </p>

  <p>
    Владелец:{" "}
    {shirt.owner_email || "нет"}
  </p>

  <p>
    Сканов:{" "}
    {shirt.scans}
  </p>

  {shirt.owner_email && (

  <button
    className="danger-button"
    onClick={unassignShirt}
    style={{
      marginRight: 8
    }}
  >
    Отвязать футболку
  </button>

)}

  {shirt.state === "blocked" ? (

  <button
    className="primary-button"
    onClick={unblockShirt}
  >
    Разблокировать
  </button>

) : shirt.state !== "unclaimed" ? (

  <button
    className="danger-button"
    onClick={blockShirt}
  >
    Заблокировать
  </button>

) : null}

</div>

<br />

{shirt.state === "unclaimed" && (

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 24,
      marginBottom: 24
    }}
  >

    <div className="card">

      <h2
  style={{
    marginBottom: 40
  }}
>
  Claim-код
</h2>


      <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    marginTop: 20
  }}
>

  <strong
  style={{
    fontSize: 32,
    letterSpacing: 2,
    textAlign: "center"
  }}
>
  {shirt.claim_code || "Нет"}
</strong>

  <button
  className="primary-button"
  onClick={regenerateClaimCode}
>
  Перегенерировать
</button>

</div>

    </div>

    <div className="card">

      <h2>
        QR-код
      </h2>

      <img
        src={qrUrl}
        alt="QR"
        style={{
          width: 140,
          height: 140,
          objectFit: "contain",
          display: "block"
        }}
      />

      <br />

      <a
        href={qrUrl}
        target="_blank"
        rel="noreferrer"
      >
        Открыть QR
      </a>

      {" | "}

      <a
        href={qrDownloadUrl}
      >
        Скачать QR
      </a>

    </div>

  </div>

)}

{shirt.state !== "unclaimed" && (

  <>
    <div className="card">

      <h2>
        QR-код
      </h2>

      <img
        src={qrUrl}
        alt="QR"
        style={{
          width: 140,
          height: 140,
          objectFit: "contain",
          display: "block"
        }}
      />

      <br />

      <a
        href={qrUrl}
        target="_blank"
        rel="noreferrer"
      >
        Открыть QR
      </a>

      {" | "}

      <a
        href={qrDownloadUrl}
      >
        Скачать QR
      </a>

    </div>

    <br />

  </>

)}

<div className="card">

  <h2>
    Ссылка
  </h2>

  <p>

    <strong>
      Текущая:
    </strong>

    {" "}

    {
      shirt.current_url ||
      "Ссылка не установлена"
    }

  </p>

  <br />

  <input
    className="input"
    value={url}
    onChange={(e) =>
      setUrl(
        e.target.value
      )
    }
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

</div>

);
}