import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import { http }
from "../api/http";

export default function UsersPage() {

  const [
    users,
    setUsers
  ] = useState<any[]>([]);

  const [
    search,
    setSearch
  ] = useState("");

  useEffect(() => {

    http
      .get("/admin/users")
      .then((res) =>
        setUsers(
          res.data
        )
      );

  }, []);

  const filteredUsers =
    users.filter(
      (user) =>
        user.email
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (

    <div>

      <h1>
        Пользователи
      </h1>

      <input
        placeholder="Поиск по email..."
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
              Email
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

          </tr>

        </thead>

        <tbody>

          {filteredUsers.map((user) => (

            <tr
              key={user.id}
            >

              <td
                style={{
                  padding: 12,
                  borderBottom:
                    "1px solid #eee"
                }}
              >

                <Link
                  to={`/adm/users/${user.id}`}
                >
                  {user.email}
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
      user.status === "active"
        ? "#16a34a"
        : user.status === "blocked"
        ? "#dc2626"
        : "#ea580c",
    fontWeight: "bold"
  }}
>
  {user.status}
</span>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}