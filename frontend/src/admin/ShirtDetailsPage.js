import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { http } from "../api/http";
export default function ShirtDetailsPage() {
    const { id } = useParams();
    const [shirt, setShirt] = useState(null);
    const [url, setUrl] = useState("");
    const qrUrl = `${import.meta.env.VITE_API_URL}/admin/shirts/${id}/qr`;
    const qrDownloadUrl = `${import.meta.env.VITE_API_URL}/admin/shirts/${id}/qr/download`;
    async function loadShirt() {
        const res = await http.get(`/admin/shirts/${id}`);
        setShirt(res.data);
        setUrl(res.data.current_url || "");
    }
    useEffect(() => {
        loadShirt();
    }, [id]);
    async function blockShirt() {
        if (!window.confirm("Заблокировать футболку?")) {
            return;
        }
        await http.post(`/admin/shirts/${id}/block`);
        loadShirt();
    }
    async function unblockShirt() {
        if (!window.confirm("Разблокировать футболку?")) {
            return;
        }
        await http.post(`/admin/shirts/${id}/unblock`);
        loadShirt();
    }
    async function saveLink() {
        await http.put(`/admin/shirts/${id}/link`, {
            url
        });
        loadShirt();
    }
    async function deleteLink() {
        if (!window.confirm("Удалить ссылку?")) {
            return;
        }
        await http.delete(`/admin/shirts/${id}/link`);
        loadShirt();
    }
    async function unassignShirt() {
        if (!window.confirm("Отвязать футболку от владельца?")) {
            return;
        }
        await http.post(`/admin/shirts/${id}/unassign`);
        loadShirt();
    }
    async function regenerateClaimCode() {
        if (!window.confirm("Сгенерировать новый claim-код?")) {
            return;
        }
        const res = await http.post(`/admin/shirts/${id}/regenerate-claim`);
        setShirt((prev) => ({
            ...prev,
            claim_code: res.data.claimCode
        }));
    }
    if (!shirt) {
        return _jsx("p", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." });
    }
    return (_jsxs("div", { className: "page", children: [_jsx(Link, { to: "/adm/shirts", children: "\u2190 \u041A \u0444\u0443\u0442\u0431\u043E\u043B\u043A\u0430\u043C" }), _jsx("br", {}), _jsx("br", {}), _jsx("h2", { style: {
                    fontSize: 30,
                    marginBottom: 16,
                    wordBreak: "break-all"
                }, children: shirt.public_id }), _jsxs("div", { className: "card", children: [_jsxs("p", { children: ["\u0421\u0442\u0430\u0442\u0443\u0441:", " ", _jsx("strong", { style: {
                                    color: shirt.state === "claimed"
                                        ? "#16a34a"
                                        : shirt.state === "blocked"
                                            ? "#dc2626"
                                            : "#ea580c"
                                }, children: shirt.state })] }), _jsxs("p", { children: ["\u0412\u043B\u0430\u0434\u0435\u043B\u0435\u0446:", " ", shirt.owner_email || "нет"] }), _jsxs("p", { children: ["\u0421\u043A\u0430\u043D\u043E\u0432:", " ", shirt.scans] }), shirt.owner_email && (_jsx("button", { className: "danger-button", onClick: unassignShirt, style: {
                            marginRight: 8
                        }, children: "\u041E\u0442\u0432\u044F\u0437\u0430\u0442\u044C \u0444\u0443\u0442\u0431\u043E\u043B\u043A\u0443" })), shirt.state === "blocked" ? (_jsx("button", { className: "primary-button", onClick: unblockShirt, children: "\u0420\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C" })) : shirt.state !== "unclaimed" ? (_jsx("button", { className: "danger-button", onClick: blockShirt, children: "\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C" })) : null] }), _jsx("br", {}), shirt.state === "unclaimed" && (_jsxs("div", { style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 24,
                    marginBottom: 24
                }, children: [_jsxs("div", { className: "card", children: [_jsx("h2", { style: {
                                    marginBottom: 40
                                }, children: "Claim-\u043A\u043E\u0434" }), _jsxs("div", { style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 12,
                                    marginTop: 20
                                }, children: [_jsx("strong", { style: {
                                            fontSize: 32,
                                            letterSpacing: 2,
                                            textAlign: "center"
                                        }, children: shirt.claim_code || "Нет" }), _jsx("button", { className: "primary-button", onClick: regenerateClaimCode, children: "\u041F\u0435\u0440\u0435\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C" })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "QR-\u043A\u043E\u0434" }), _jsx("img", { src: qrUrl, alt: "QR", style: {
                                    width: 140,
                                    height: 140,
                                    objectFit: "contain",
                                    display: "block"
                                } }), _jsx("br", {}), _jsx("a", { href: qrUrl, target: "_blank", rel: "noreferrer", children: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C QR" }), " | ", _jsx("a", { href: qrDownloadUrl, children: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C QR" })] })] })), shirt.state !== "unclaimed" && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "card", children: [_jsx("h2", { children: "QR-\u043A\u043E\u0434" }), _jsx("img", { src: qrUrl, alt: "QR", style: {
                                    width: 140,
                                    height: 140,
                                    objectFit: "contain",
                                    display: "block"
                                } }), _jsx("br", {}), _jsx("a", { href: qrUrl, target: "_blank", rel: "noreferrer", children: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C QR" }), " | ", _jsx("a", { href: qrDownloadUrl, children: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C QR" })] }), _jsx("br", {})] })), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\u0421\u0441\u044B\u043B\u043A\u0430" }), _jsxs("p", { children: [_jsx("strong", { children: "\u0422\u0435\u043A\u0443\u0449\u0430\u044F:" }), " ", shirt.current_url ||
                                "Ссылка не установлена"] }), _jsx("br", {}), _jsx("input", { className: "input", value: url, onChange: (e) => setUrl(e.target.value) }), _jsx("br", {}), _jsx("br", {}), _jsx("button", { className: "primary-button", onClick: saveLink, children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443" }), " ", _jsx("button", { className: "danger-button", onClick: deleteLink, children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443" })] })] }));
}
