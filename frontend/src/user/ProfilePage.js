import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { http } from "../api/http";
export default function ProfilePage() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        http
            .get("/api/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => setUser(res.data));
    }, []);
    if (!user) {
        return _jsx("p", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." });
    }
    return (_jsxs("div", { className: "page", children: [_jsx("h1", { className: "page-title", children: "\u041F\u0440\u043E\u0444\u0438\u043B\u044C" }), _jsxs("div", { className: "card", children: [_jsxs("p", { children: [_jsx("strong", { children: "Email:" }), " ", user.email] }), _jsxs("p", { children: [_jsx("strong", { children: "\u0421\u0442\u0430\u0442\u0443\u0441:" }), " ", user.status] }), _jsxs("p", { children: [_jsx("strong", { children: "\u0414\u0430\u0442\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438:" }), " ", new Date(user.created_at).toLocaleString()] })] })] }));
}
