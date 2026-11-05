import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http } from "../api/http";
export default function ShirtsPage() {
    const [shirts, setShirts] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        http
            .get("/admin/shirts")
            .then((res) => setShirts(res.data));
    }, []);
    const filteredShirts = shirts.filter((shirt) => shirt.public_id
        .toLowerCase()
        .includes(search.toLowerCase()));
    return (_jsxs("div", { children: [_jsx("h1", { children: "\u0424\u0443\u0442\u0431\u043E\u043B\u043A\u0438" }), _jsx("input", { placeholder: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E Public ID...", value: search, onChange: (e) => setSearch(e.target.value), style: {
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
                                    }, children: "Public ID" }), _jsx("th", { style: {
                                        padding: 12,
                                        textAlign: "left",
                                        borderBottom: "1px solid #ddd"
                                    }, children: "\u0421\u0442\u0430\u0442\u0443\u0441" }), _jsx("th", { style: {
                                        padding: 12,
                                        textAlign: "left",
                                        borderBottom: "1px solid #ddd"
                                    }, children: "\u0412\u043B\u0430\u0434\u0435\u043B\u0435\u0446" }), _jsx("th", { style: {
                                        padding: 12,
                                        textAlign: "left",
                                        borderBottom: "1px solid #ddd"
                                    }, children: "\u0421\u043A\u0430\u043D\u043E\u0432" })] }) }), _jsx("tbody", { children: filteredShirts.map((shirt) => (_jsxs("tr", { children: [_jsx("td", { style: {
                                        padding: 12,
                                        borderBottom: "1px solid #eee"
                                    }, children: _jsx(Link, { to: `/adm/shirts/${shirt.id}`, children: shirt.public_id }) }), _jsx("td", { style: {
                                        padding: 12,
                                        borderBottom: "1px solid #eee"
                                    }, children: _jsx("span", { style: {
                                            color: shirt.state === "claimed"
                                                ? "#16a34a"
                                                : "#ea580c",
                                            fontWeight: "bold"
                                        }, children: shirt.state }) }), _jsx("td", { style: {
                                        padding: 12,
                                        borderBottom: "1px solid #eee"
                                    }, children: shirt.owner_email || "-" }), _jsx("td", { style: {
                                        padding: 12,
                                        borderBottom: "1px solid #eee"
                                    }, children: shirt.scans })] }, shirt.id))) })] })] }));
}
