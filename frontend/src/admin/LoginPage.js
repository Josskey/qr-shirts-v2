import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../api/http";
export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function submit() {
        try {
            const res = await http.post("/admin/login", {
                email,
                password
            });
            localStorage.setItem("adminToken", res.data.token);
            navigate("/adm/users");
        }
        catch {
            alert("Неверный логин или пароль");
        }
    }
    return (_jsx("div", { className: "auth-container", children: _jsxs("div", { className: "auth-card", children: [_jsx("h1", { className: "auth-title", children: "QR Shirts Admin" }), _jsx("input", { className: "input", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("br", {}), _jsx("br", {}), _jsx("input", { className: "input", type: "password", placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx("br", {}), _jsx("br", {}), _jsx("button", { className: "primary-button", onClick: submit, children: "\u0412\u043E\u0439\u0442\u0438" })] }) }));
}
