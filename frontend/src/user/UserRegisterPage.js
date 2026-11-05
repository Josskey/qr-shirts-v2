import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../api/http";
export default function UserRegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function submit() {
        try {
            const res = await http.post("/api/auth/register", {
                email,
                password
            });
            localStorage.setItem("userToken", res.data.token);
            navigate("/my-shirts");
        }
        catch (err) {
            alert(err?.response?.data?.error ||
                "Ошибка регистрации");
        }
    }
    return (_jsx("div", { className: "auth-container", children: _jsxs("div", { className: "auth-card", children: [_jsx("h1", { className: "auth-title", children: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F" }), _jsx("input", { className: "input", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("br", {}), _jsx("br", {}), _jsx("input", { className: "input", type: "password", placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx("br", {}), _jsx("br", {}), _jsx("button", { className: "primary-button", onClick: submit, children: "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F" })] }) }));
}
