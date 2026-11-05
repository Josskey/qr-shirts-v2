import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http } from "../api/http";
export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        http
            .get("/admin/users")
            .then((res) => setUsers(res.data));
    }, []);
    const filteredUsers = users.filter((user) => user.email
        .toLowerCase()
        .includes(search.toLowerCase()));
    return (_jsxs("div", { children: [_jsx("h1", { children: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438" }), _jsx("input", { placeholder: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E email...", value: search, onChange: (e) => setSearch(e.target.value), style: {
                    width: "100%",
                    padding: 10,
                    marginBottom: 16,
                    borderRadius: 8,
                    border: "1px solid #ddd"
                } }), _jsxs("table", { style: {
                    width: "100%",
                    borderCollapse: "collapse",
                    background: "white"
                }, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { style: {
                                        padding: 12,
                                        textAlign: "left",
                                        borderBottom: "1px solid #ddd"
                                    }, children: "Email" }), _jsx("th", { style: {
                                        padding: 12,
                                        textAlign: "left",
                                        borderBottom: "1px solid #ddd"
                                    }, children: "\u0421\u0442\u0430\u0442\u0443\u0441" })] }) }), _jsx("tbody", { children: filteredUsers.map((user) => (_jsxs("tr", { children: [_jsx("td", { style: {
                                        padding: 12,
                                        borderBottom: "1px solid #eee"
                                    }, children: _jsx(Link, { to: `/adm/users/${user.id}`, children: user.email }) }), _jsx("td", { style: {
                                        padding: 12,
                                        borderBottom: "1px solid #eee"
                                    }, children: _jsx("span", { style: {
                                            color: user.status === "active"
                                                ? "#16a34a"
                                                : user.status === "blocked"
                                                    ? "#dc2626"
                                                    : "#ea580c",
                                            fontWeight: "bold"
                                        }, children: user.status }) })] }, user.id))) })] })] }));
}
