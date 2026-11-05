import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { http } from "../api/http";
export default function ClaimShirtPage() {
    const [claimCode, setClaimCode] = useState("");
    async function submit() {
        try {
            const token = localStorage.getItem("userToken");
            const res = await http.post("/api/shirts/claim", {
                claimCode
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert(`Футболка активирована: ${res.data.publicId}`);
            setClaimCode("");
        }
        catch (err) {
            alert(err?.response?.data?.error ||
                "Ошибка активации");
        }
    }
    return (_jsxs("div", { className: "page", children: [_jsx("h1", { className: "page-title", children: "\u0410\u043A\u0442\u0438\u0432\u0430\u0446\u0438\u044F \u0444\u0443\u0442\u0431\u043E\u043B\u043A\u0438" }), _jsxs("div", { className: "card", children: [_jsx("input", { className: "input", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 claim-\u043A\u043E\u0434", value: claimCode, onChange: (e) => setClaimCode(e.target.value) }), _jsx("br", {}), _jsx("br", {}), _jsx("button", { className: "primary-button", onClick: submit, children: "\u0410\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u0442\u044C" })] })] }));
}
