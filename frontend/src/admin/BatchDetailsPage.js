import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { http } from "../api/http";
export default function BatchDetailsPage() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    useEffect(() => {
        http
            .get(`/admin/batches/${id}`)
            .then((res) => setData(res.data));
    }, [id]);
    async function downloadCsv() {
        const response = await http.get(`/admin/batches/${id}/export`, {
            responseType: "blob"
        });
        const blob = new Blob([response.data], {
            type: "text/csv"
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href =
            url;
        link.download =
            `batch-${id}.csv`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    }
    if (!data) {
        return _jsx("p", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." });
    }
    return (_jsxs("div", { children: [_jsx("h1", { children: data.batch.name }), _jsx("button", { onClick: downloadCsv, children: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C CSV" }), _jsx("h2", { children: "\u0424\u0443\u0442\u0431\u043E\u043B\u043A\u0438" }), data.shirts.map((shirt) => (_jsxs("div", { style: {
                    border: "1px solid #ddd",
                    padding: 12,
                    marginBottom: 8,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }, children: [_jsxs("div", { children: [_jsx(Link, { to: `/adm/shirts/${shirt.id}`, children: shirt.public_id }), " — ", _jsx("span", { style: {
                                    color: shirt.state === "claimed"
                                        ? "#16a34a"
                                        : "#ea580c",
                                    fontWeight: "bold"
                                }, children: shirt.state })] }), _jsx("button", { onClick: () => window.open(`${import.meta.env.VITE_API_URL}/admin/shirts/${shirt.id}/qr`, "_blank"), children: "QR" })] }, shirt.id)))] }));
}
