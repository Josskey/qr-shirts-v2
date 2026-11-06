import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import { http }
from "../api/http";

export default function BatchesPage() {

  const [
    batches,
    setBatches
  ] = useState<any[]>([]);

  const [
    count,
    setCount
  ] = useState("10");

  async function createBatch() {

    await http.post(
      "/admin/batches/create",
      {
        count: Number(count)
      }
    );

    const res =
      await http.get(
        "/admin/batches"
      );

    setBatches(
      Array.isArray(res.data)
        ? res.data
        : []
    );

    setCount("10");

  }

  useEffect(() => {

    http
      .get("/admin/batches")
      .then((res) => {

        setBatches(
          Array.isArray(res.data)
            ? res.data
            : []
        );

      });

  }, []);

  return (

    <div>

      <h1>
        Партии
      </h1>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 12,
          padding: 16,
          marginBottom: 24
        }}
      >

        <h3>
          Создать партию
        </h3>

        <input
          type="number"
          value={count}
          onChange={(e) =>
            setCount(
              e.target.value
            )
          }
          style={{
            padding: 8,
            borderRadius: 8,
            border: "1px solid #ddd",
            marginRight: 8
          }}
        />

        {" "}

        <button
          onClick={createBatch}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: "pointer"
          }}
        >
          Создать партию
        </button>

      </div>

      {Array.isArray(batches) &&
        batches.map((batch) => (

          <div
            key={batch.id}
            style={{
              border: "1px solid #ddd",
              padding: 16,
              marginBottom: 12,
              borderRadius: 8
            }}
          >

            <h3>
              {batch.name}
            </h3>

            <p>
              Футболок:{" "}
              {batch.shirts_count}
            </p>

            <Link
              to={`/adm/batches/${batch.id}`}
            >
              Открыть
            </Link>

          </div>

        ))}

    </div>

  );

}