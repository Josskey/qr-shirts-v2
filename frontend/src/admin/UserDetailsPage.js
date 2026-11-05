import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { http } from "../api/http";
export default function UserDetailsPage() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    async function loadUser() {
        const res = await http.get(`/admin/users/${id}`);
        setData(res.data);
    }
    useEffect(() => {
        loadUser();
    }, [id]);
    async function blockUser() {
        if (!window.confirm("Заблокировать пользователя?")) {
            return;
        }
        await http.post(`/admin/users/${id}/block`);
        loadUser();
    }
    async function unblockUser() {
        if (!window.confirm("Разблокировать пользователя?")) {
            return;
        }
        await http.post(`/admin/users/${id}/unblock`);
        loadUser();
    }
    if (!data) {
        return _jsx("p", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." });
    }
    const totalShirts = data.shirts.length;
    const activeShirts = data.shirts.filter((shirt) => shirt.state === "claimed").length;
    const blockedShirts = data.shirts.filter((shirt) => shirt.state === "blocked").length;
    return (_jsxs("div", { className: "page", children: [_jsx(Link, { to: "/adm/users", children: "\u2190 \u041A \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F\u043C" }), _jsx("br", {}), _jsx("br", {}), _jsx("h1", { children: data.user.email }), _jsxs("p", { children: ["\u0421\u0442\u0430\u0442\u0443\u0441:", " ", _jsx("strong", { style: {
                            color: data.user.status === "active"
                                ? "#16a34a"
                                : "#dc2626"
                        }, children: data.user.status === "active"
                            ? "Активен"
                            : "Заблокирован" })] }), data.user.status === "active" ? (_jsx("button", { className: "danger-button", onClick: blockUser, children: "\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C" })) : (_jsx("button", { className: "primary-button", onClick: unblockUser, children: "\u0420\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C" })), _jsx("br", {}), _jsx("br", {}), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F" }), _jsxs("p", { children: ["\u0412\u0441\u0435\u0433\u043E \u0444\u0443\u0442\u0431\u043E\u043B\u043E\u043A:", " ", _jsx("strong", { children: totalShirts })] }), _jsxs("p", { children: ["\u0410\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0445:", " ", _jsx("strong", { children: activeShirts })] }), _jsxs("p", { children: ["\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0445:", " ", _jsx("strong", { children: blockedShirts })] })] }), _jsx("br", {}), _jsx("h2", { children: "\u0424\u0443\u0442\u0431\u043E\u043B\u043A\u0438" }), data.shirts.map((shirt) => (_jsxs("div", { className: "card", style: {
                    marginBottom: 12
                }, children: [_jsx(Link, { to: `/adm/shirts/${shirt.id}`, children: shirt.public_id }), " — ", _jsx("span", { style: {
                            color: shirt.state === "claimed"
                                ? "#16a34a"
                                : shirt.state === "blocked"
                                    ? "#dc2626"
                                    : "#ea580c",
                            fontWeight: "bold"
                        }, children: shirt.state === "claimed"
                            ? "Активирована"
                            : shirt.state === "blocked"
                                ? "Заблокирована"
                                : "Не активирована" }), _jsx("br", {}), "\u0421\u043A\u0430\u043D\u043E\u0432: ", shirt.scans] }, shirt.id)))] }));
}
