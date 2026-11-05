import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, Outlet } from "react-router-dom";
export default function AdminLayout() {
    function logout() {
        localStorage.removeItem("adminToken");
        window.location.href =
            "/adm/login";
    }
    return (_jsxs("div", { style: {
            display: "flex",
            minHeight: "100vh",
            background: "#f8fafc"
        }, children: [_jsxs("aside", { style: {
                    width: 260,
                    background: "#ffffff",
                    borderRight: "1px solid #e5e7eb",
                    padding: 24,
                    boxSizing: "border-box"
                }, children: [_jsx("h1", { style: {
                            marginTop: 0,
                            marginBottom: 32
                        }, children: "QR Shirts" }), _jsx("button", { onClick: logout, className: "danger-button", children: "\uD83D\uDEAA \u0412\u044B\u0439\u0442\u0438" }), _jsx("br", {}), _jsx("br", {}), _jsxs("nav", { style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 16
                        }, children: [_jsx(Link, { className: "sidebar-link", to: "/adm/dashboard", children: "\uD83D\uDCCA \u0413\u043B\u0430\u0432\u043D\u0430\u044F" }), _jsx(Link, { className: "sidebar-link", to: "/adm/users", children: "\uD83D\uDC64 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438" }), _jsx(Link, { className: "sidebar-link", to: "/adm/shirts", children: "\uD83D\uDC55 \u0424\u0443\u0442\u0431\u043E\u043B\u043A\u0438" }), _jsx(Link, { className: "sidebar-link", to: "/adm/batches", children: "\uD83D\uDCE6 \u041F\u0430\u0440\u0442\u0438\u0438" })] })] }), _jsx("main", { style: {
                    flex: 1,
                    padding: 32,
                    overflowY: "auto"
                }, children: _jsx(Outlet, {}) })] }));
}
