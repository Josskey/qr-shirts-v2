import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, Outlet } from "react-router-dom";
export default function UserLayout() {
    function logout() {
        localStorage.removeItem("userToken");
        window.location.href =
            "/login";
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
                        }, children: "QR Shirts" }), _jsxs("nav", { style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 16
                        }, children: [_jsx(Link, { to: "/my-shirts", style: {
                                    textDecoration: "none",
                                    fontSize: 18
                                }, children: "\uD83D\uDC55 \u041C\u043E\u0438 \u0444\u0443\u0442\u0431\u043E\u043B\u043A\u0438" }), _jsx(Link, { to: "/claim", style: {
                                    textDecoration: "none",
                                    fontSize: 18
                                }, children: "\u2795 \u0410\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u0442\u044C" }), _jsx(Link, { to: "/profile", style: {
                                    textDecoration: "none",
                                    fontSize: 18
                                }, children: "\uD83D\uDC64 \u041F\u0440\u043E\u0444\u0438\u043B\u044C" }), _jsx("button", { onClick: logout, style: {
                                    marginTop: 24,
                                    padding: 12,
                                    border: "none",
                                    borderRadius: 8,
                                    background: "#dc2626",
                                    color: "white",
                                    cursor: "pointer",
                                    fontWeight: "bold"
                                }, children: "\uD83D\uDEAA \u0412\u044B\u0439\u0442\u0438" })] })] }), _jsx("main", { style: {
                    flex: 1,
                    padding: 32,
                    overflowY: "auto"
                }, children: _jsx(Outlet, {}) })] }));
}
