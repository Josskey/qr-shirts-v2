import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http } from "../api/http";
export default function DashboardPage() {
    const [stats, setStats] = useState(null);
    const [batches, setBatches] = useState([]);
    useEffect(() => {
        http
            .get("/admin/stats")
            .then((res) => setStats(res.data));
        http
            .get("/admin/batches")
            .then((res) => setBatches(res.data.slice(0, 5)));
    }, []);
    if (!stats) {
        return _jsx("p", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." });
    }
    return (_jsxs("div", { children: [_jsx("h1", { children: "Dashboard" }), _jsx("p", { style: {
                    color: "#666",
                    marginBottom: 24
                }, children: "\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u0432 \u0430\u0434\u043C\u0438\u043D\u043A\u0443 QR Shirts" }), _jsxs("div", { style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 20
                }, children: [_jsx(Link, { to: "/adm/users", style: {
                            textDecoration: "none",
                            color: "inherit"
                        }, children: _jsxs("div", { style: {
                                border: "1px solid #ddd",
                                padding: 20,
                                borderRadius: 16,
                                cursor: "pointer",
                                background: "white",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                            }, children: [_jsx("h3", { children: "\uD83D\uDC64 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438" }), _jsx("h1", { children: stats.users })] }) }), _jsx(Link, { to: "/adm/shirts", style: {
                            textDecoration: "none",
                            color: "inherit"
                        }, children: _jsxs("div", { style: {
                                border: "1px solid #ddd",
                                padding: 20,
                                borderRadius: 16,
                                cursor: "pointer",
                                background: "white",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                            }, children: [_jsx("h3", { children: "\uD83D\uDC55 \u0424\u0443\u0442\u0431\u043E\u043B\u043A\u0438" }), _jsx("h1", { children: stats.shirts })] }) }), _jsx(Link, { to: "/adm/batches", style: {
                            textDecoration: "none",
                            color: "inherit"
                        }, children: _jsxs("div", { style: {
                                border: "1px solid #ddd",
                                padding: 20,
                                borderRadius: 16,
                                cursor: "pointer",
                                background: "white",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                            }, children: [_jsx("h3", { children: "\uD83D\uDCE6 \u041F\u0430\u0440\u0442\u0438\u0438" }), _jsx("h1", { children: stats.batches })] }) }), _jsxs("div", { style: {
                            border: "1px solid #ddd",
                            padding: 20,
                            borderRadius: 16,
                            background: "white",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                        }, children: [_jsx("h3", { children: "\uD83D\uDCCA \u0421\u043A\u0430\u043D\u043E\u0432" }), _jsx("h1", { children: stats.scans })] })] }), _jsx("h2", { style: {
                    marginTop: 40
                }, children: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u043F\u0430\u0440\u0442\u0438\u0438" }), batches.map((batch) => (_jsx(Link, { to: `/adm/batches/${batch.id}`, style: {
                    display: "block",
                    textDecoration: "none",
                    color: "inherit",
                    marginBottom: 12
                }, children: _jsxs("div", { style: {
                        border: "1px solid #ddd",
                        padding: 16,
                        borderRadius: 12,
                        background: "white",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                    }, children: [_jsx("strong", { children: batch.name }), _jsx("br", {}), "\u0424\u0443\u0442\u0431\u043E\u043B\u043E\u043A:", " ", batch.shirts_count] }) }, batch.id)))] }));
}
