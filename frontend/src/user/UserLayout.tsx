import {
  Link,
  Outlet
} from "react-router-dom";

export default function UserLayout() {

  function logout() {

    localStorage.removeItem(
      "userToken"
    );

    window.location.href =
      "/login";

  }

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8fafc"
      }}
    >

      <aside
        style={{
          width: 260,
          background: "#ffffff",
          borderRight: "1px solid #e5e7eb",
          padding: 24,
          boxSizing: "border-box"
        }}
      >

        <h1
          style={{
            marginTop: 0,
            marginBottom: 32
          }}
        >
          QR Shirts
        </h1>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}
        >

          <Link
            to="/my-shirts"
            style={{
              textDecoration: "none",
              fontSize: 18
            }}
          >
            👕 Мои футболки
          </Link>

          <Link
            to="/claim"
            style={{
              textDecoration: "none",
              fontSize: 18
            }}
          >
            ➕ Активировать
          </Link>

          <Link
            to="/profile"
            style={{
              textDecoration: "none",
              fontSize: 18
            }}
          >
            👤 Профиль
          </Link>

          <button
            onClick={logout}
            style={{
              marginTop: 24,
              padding: 12,
              border: "none",
              borderRadius: 8,
              background: "#dc2626",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            🚪 Выйти
          </button>

        </nav>

      </aside>

      <main
        style={{
          flex: 1,
          padding: 32,
          overflowY: "auto"
        }}
      >
        <Outlet />
      </main>

    </div>

  );

}