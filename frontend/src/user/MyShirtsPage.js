import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http } from "../api/http";
export default function MyShirtsPage() {
    const [shirts, setShirts] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        http
            .get("/api/shirts/my", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => setShirts(res.data));
    }, []);
    return (_jsxs("div", { className: "page", children: [_jsx("h1", { className: "page-title", children: "\u041C\u043E\u0438 \u0444\u0443\u0442\u0431\u043E\u043B\u043A\u0438" }), shirts.length === 0 && (_jsx("div", { className: "card", children: "\u0423 \u0432\u0430\u0441 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u0444\u0443\u0442\u0431\u043E\u043B\u043E\u043A" })), shirts.map((shirt) => (_jsxs("div", { className: "card", style: {
                    marginBottom: 12
                }, children: [_jsx(Link, { to: `/my-shirts/${shirt.public_id}`, style: {
                            fontWeight: "bold",
                            fontSize: 18,
                            textDecoration: "none"
                        }, children: shirt.public_id }), _jsx("br", {}), _jsx("br", {}), _jsx("span", { style: {
                            color: shirt.state === "claimed"
                                ? "#16a34a"
                                : shirt.state === "blocked"
                                    ? "#dc2626"
                                    : "#ea580c",
                            fontWeight: "bold"
                        }, children: shirt.state })] }, shirt.id)))] }));
}
