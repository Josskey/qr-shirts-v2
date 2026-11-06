import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import { http }
from "../api/http";

export default function DashboardPage() {

  const [stats, setStats] =
    useState<any>(null);

  const [batches, setBatches] =
    useState<any[]>([]);

  useEffect(() => {

    http
      .get("/admin/stats")
      .then((res) => {

        setStats(
          res.data
        );

      });

    http
      .get("/admin/batches")
      .then((res) => {

        setBatches(
          Array.isArray(res.data)
            ? res.data.slice(0, 5)
            : []
        );

      });

  }, []);

  if (!stats) {
    return <p>Загрузка...</p>;
  }

  return (

    <div>

      <h1>Dashboard</h1>

      <p
        style={{
          color: "#666",
          marginBottom: 24
        }}
      >
        Добро пожаловать в админку QR Shirts
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20
        }}
      >

        <Link
          to="/adm/users"
          style={{
            textDecoration: "none",
            color: "inherit"
          }}
        >
          <div
            style={{
              border: "1px solid #ddd",
              padding: 20,
              borderRadius: 16,
              cursor: "pointer",
              background: "white",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.05)"
            }}
          >
            <h3>👤 Пользователи</h3>
            <h1>{stats.users}</h1>
          </div>
        </Link>

        <Link
          to="/adm/shirts"
          style={{
            textDecoration: "none",
            color: "inherit"
          }}
        >
          <div
            style={{
              border: "1px solid #ddd",
              padding: 20,
              borderRadius: 16,
              cursor: "pointer",
              background: "white",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.05)"
            }}
          >
            <h3>👕 Футболки</h3>
            <h1>{stats.shirts}</h1>
          </div>
        </Link>

        <Link
          to="/adm/batches"
          style={{
            textDecoration: "none",
            color: "inherit"
          }}
        >
          <div
            style={{
              border: "1px solid #ddd",
              padding: 20,
              borderRadius: 16,
              cursor: "pointer",
              background: "white",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.05)"
            }}
          >
            <h3>📦 Партии</h3>
            <h1>{stats.batches}</h1>
          </div>
        </Link>

        <div
          style={{
            border: "1px solid #ddd",
            padding: 20,
            borderRadius: 16,
            background: "white",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.05)"
          }}
        >
          <h3>📊 Сканов</h3>
          <h1>{stats.scans}</h1>
        </div>

      </div>

      <h2
        style={{
          marginTop: 40
        }}
      >
        Последние партии
      </h2>

      {Array.isArray(batches) &&
        batches.map((batch) => (

          <Link
            key={batch.id}
            to={`/adm/batches/${batch.id}`}
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              marginBottom: 12
            }}
          >

            <div
              style={{
                border: "1px solid #ddd",
                padding: 16,
                borderRadius: 12,
                background: "white",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.05)"
              }}
            >

              <strong>
                {batch.name}
              </strong>

              <br />

              Футболок:{" "}
              {batch.shirts_count}

            </div>

          </Link>

        ))}

    </div>

  );

}
