import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http } from "../api/http";
export default function BatchesPage() {
    const [batches, setBatches] = useState([]);
    const [count, setCount] = useState("10");
    async function createBatch() {
        await http.post("/admin/batches/create", {
            count: Number(count)
        });
        const res = await http.get("/admin/batches");
        setBatches(res.data);
        setCount("10");
    }
    useEffect(() => {
        http
            .get("/admin/batches")
            .then((res) => setBatches(res.data));
    }, []);
    return (_jsxs("div", { children: [_jsx("h1", { children: "\u041F\u0430\u0440\u0442\u0438\u0438" }), _jsxs("div", { style: {
                    border: "1px solid #ddd",
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 24
                }, children: [_jsx("h3", { children: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0430\u0440\u0442\u0438\u044E" }), _jsx("input", { type: "number", value: count, onChange: (e) => setCount(e.target.value), style: {
                            padding: 8,
                            borderRadius: 8,
                            border: "1px solid #ddd",
                            marginRight: 8
                        } }), " ", _jsx("button", { onClick: createBatch, style: {
                            padding: "8px 16px",
                            borderRadius: 8,
                            border: "none",
                            background: "#2563eb",
                            color: "white",
                            cursor: "pointer"
                        }, children: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0430\u0440\u0442\u0438\u044E" })] }), batches.map((batch) => (_jsxs("div", { style: {
                    border: "1px solid #ddd",
                    padding: 16,
                    marginBottom: 12,
                    borderRadius: 8
                }, children: [_jsx("h3", { children: batch.name }), _jsxs("p", { children: ["\u0424\u0443\u0442\u0431\u043E\u043B\u043E\u043A:", " ", batch.shirts_count] }), _jsx(Link, { to: `/adm/batches/${batch.id}`, children: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C" })] }, batch.id)))] }));
}
