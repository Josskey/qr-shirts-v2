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

export default function BatchDetailsPage() {

  const { id } =
    useParams();

  const [data, setData] =
    useState<any>(null);

  useEffect(() => {

    http
      .get(
        `/admin/batches/${id}`
      )
      .then(
        (res) =>
          setData(
            res.data
          )
      );

  }, [id]);

  async function downloadCsv() {

    const response =
      await http.get(
        `/admin/batches/${id}/export`,
        {
          responseType: "blob"
        }
      );

    const blob =
      new Blob(
        [response.data],
        {
          type: "text/csv"
        }
      );

    const url =
      window.URL.createObjectURL(
        blob
      );

    const link =
      document.createElement("a");

    link.href =
      url;

    link.download =
      `batch-${id}.csv`;

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    window.URL.revokeObjectURL(
      url
    );

  }

  if (!data) {

    return <p>Загрузка...</p>;

  }

  return (

    <div>

      <h1>
        {data.batch.name}
      </h1>

      <button
        onClick={downloadCsv}
      >
        Скачать CSV
      </button>

      <h2>
        Футболки
      </h2>

      {data.shirts.map(
        (shirt: any) => (

          <div
            key={shirt.id}
            style={{
              border: "1px solid #ddd",
              padding: 12,
              marginBottom: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >

            <div>

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
                      : "#ea580c",
                  fontWeight: "bold"
                }}
              >
                {shirt.state}
              </span>

            </div>

            <button
              onClick={() =>
                window.open(
                  `${import.meta.env.VITE_API_URL}/admin/shirts/${shirt.id}/qr`,
                  "_blank"
                )
              }
            >
              QR
            </button>

          </div>

        )
      )}

    </div>

  );

}