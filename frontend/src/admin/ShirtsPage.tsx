import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import { http }
from "../api/http";

export default function ShirtsPage() {

  const [
    shirts,
    setShirts
  ] = useState<any[]>([]);

  const [
    search,
    setSearch
  ] = useState("");

  useEffect(() => {

    http
      .get("/admin/shirts")
      .then((res) =>
        setShirts(
          res.data
        )
      );

  }, []);

  const filteredShirts =
    shirts.filter(
      (shirt) =>
        shirt.public_id
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (

    <div>

      <h1>
        Футболки
      </h1>

      <input
        placeholder="Поиск по Public ID..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 16,
          borderRadius: 8,
          border: "1px solid #ddd"
        }}
      />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white"
        }}
      >

        <thead>

          <tr>

            <th
              style={{
                padding: 12,
                textAlign: "left",
                borderBottom:
                  "1px solid #ddd"
              }}
            >
              Public ID
            </th>

            <th
              style={{
                padding: 12,
                textAlign: "left",
                borderBottom:
                  "1px solid #ddd"
              }}
            >
              Статус
            </th>

            <th
              style={{
                padding: 12,
                textAlign: "left",
                borderBottom:
                  "1px solid #ddd"
              }}
            >
              Владелец
            </th>

            <th
              style={{
                padding: 12,
                textAlign: "left",
                borderBottom:
                  "1px solid #ddd"
              }}
            >
              Сканов
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredShirts.map((shirt) => (

            <tr
              key={shirt.id}
            >

              <td
                style={{
                  padding: 12,
                  borderBottom:
                    "1px solid #eee"
                }}
              >

                <Link
                  to={`/adm/shirts/${shirt.id}`}
                >
                  {shirt.public_id}
                </Link>

              </td>

              <td
                style={{
                  padding: 12,
                  borderBottom:
                    "1px solid #eee"
                }}
              >

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

              </td>

              <td
                style={{
                  padding: 12,
                  borderBottom:
                    "1px solid #eee"
                }}
              >
                {shirt.owner_email || "-"}
              </td>

              <td
                style={{
                  padding: 12,
                  borderBottom:
                    "1px solid #eee"
                }}
              >
                {shirt.scans}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}