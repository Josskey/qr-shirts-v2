import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import { http }
from "../api/http";

export default function MyShirtsPage() {

  const [
    shirts,
    setShirts
  ] = useState<any[]>([]);

  useEffect(() => {

    const token =
      localStorage.getItem(
        "userToken"
      );

    http
      .get(
        "/api/shirts/my",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )
      .then((res) =>
        setShirts(
          res.data
        )
      );

  }, []);

  return (

    <div className="page">

      <h1 className="page-title">
        Мои футболки
      </h1>

      {shirts.length === 0 && (

        <div className="card">
          У вас пока нет
          активированных футболок
        </div>

      )}

      {shirts.map(
        (shirt) => (

          <div
            key={shirt.id}
            className="card"
            style={{
              marginBottom: 12
            }}
          >

            <Link
              to={`/my-shirts/${shirt.public_id}`}
              style={{
                fontWeight: "bold",
                fontSize: 18,
                textDecoration: "none"
              }}
            >
              {shirt.public_id}
            </Link>

            <br />
            <br />

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
  {shirt.state}
</span>

          </div>

        )
      )}

    </div>

  );

}
