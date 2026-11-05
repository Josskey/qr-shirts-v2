import {
  Link,
  Outlet
} from "react-router-dom";

export default function AdminLayout() {

  function logout() {

    localStorage.removeItem(
      "adminToken"
    );

    window.location.href =
      "/adm/login";

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

        <button
          onClick={logout}
          className="danger-button"
        >
          🚪 Выйти
        </button>

        <br />
        <br />

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}
        >

          <Link
            className="sidebar-link"
            to="/adm/dashboard"
          >
            📊 Главная
          </Link>

          <Link
            className="sidebar-link"
            to="/adm/users"
          >
            👤 Пользователи
          </Link>

          <Link
            className="sidebar-link"
            to="/adm/shirts"
          >
            👕 Футболки
          </Link>

          <Link
            className="sidebar-link"
            to="/adm/batches"
          >
            📦 Партии
          </Link>

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