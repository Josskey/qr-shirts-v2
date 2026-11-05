import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { http } from "../api/http";
export default function UserShirtPage() {
    const { publicId } = useParams();
    const [scans, setScans] = useState(0);
    const [url, setUrl] = useState("");
    const [currentUrl, setCurrentUrl] = useState("");
    const [shirtState, setShirtState] = useState("");
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        http
            .get(`/api/shirts/${publicId}/stats`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => setScans(res.data.scans));
        http
            .get(`/api/shirts/${publicId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
            setCurrentUrl(res.data.url || "");
            setUrl(res.data.url || "");
            setShirtState(res.data.state || "");
        });
    }, [publicId]);
    async function saveLink() {
        try {
            const token = localStorage.getItem("userToken");
            await http.put(`/api/shirts/${publicId}/link`, {
                url
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCurrentUrl(url);
            alert("Ссылка обновлена");
        }
        catch {
            alert("Ошибка изменения ссылки");
        }
    }
    async function deleteLink() {
        try {
            const token = localStorage.getItem("userToken");
            await http.delete(`/api/shirts/${publicId}/link`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCurrentUrl("");
            setUrl("");
            alert("Ссылка удалена");
        }
        catch {
            alert("Ошибка удаления ссылки");
        }
    }
    return (_jsxs("div", { className: "page", children: [_jsx(Link, { to: "/my-shirts", style: {
                    textDecoration: "none"
                }, children: "\u2190 \u041D\u0430\u0437\u0430\u0434 \u043A \u0444\u0443\u0442\u0431\u043E\u043B\u043A\u0430\u043C" }), _jsx("br", {}), _jsx("br", {}), _jsxs("div", { className: "card", children: [_jsx("h1", { className: "page-title", children: publicId }), _jsxs("p", { children: ["\u0421\u0442\u0430\u0442\u0443\u0441:", " ", _jsx("strong", { style: {
                                    color: shirtState === "claimed"
                                        ? "#16a34a"
                                        : shirtState === "blocked"
                                            ? "#dc2626"
                                            : "#ea580c"
                                }, children: shirtState })] }), _jsxs("p", { children: ["\u0421\u043A\u0430\u043D\u043E\u0432:", " ", _jsx("strong", { children: scans })] })] }), _jsx("br", {}), shirtState === "blocked" && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "card", style: {
                            borderColor: "#dc2626",
                            background: "#fef2f2"
                        }, children: [_jsx("strong", { style: {
                                    color: "#dc2626"
                                }, children: "\uD83D\uDEAB \u0424\u0443\u0442\u0431\u043E\u043B\u043A\u0430 \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u0430 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u043E\u043C" }), _jsx("p", { children: "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0441\u0441\u044B\u043B\u043A\u0438 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E." })] }), _jsx("br", {})] })), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430" }), _jsx("p", { children: currentUrl
                            ? currentUrl
                            : "Ссылка не установлена" })] }), _jsx("br", {}), shirtState !== "blocked" && (_jsxs("div", { className: "card", children: [_jsx("h2", { children: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443" }), _jsx("input", { className: "input", value: url, onChange: (e) => setUrl(e.target.value), placeholder: "https://..." }), _jsx("br", {}), _jsx("br", {}), _jsx("button", { className: "primary-button", onClick: saveLink, children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443" }), " ", _jsx("button", { className: "danger-button", onClick: deleteLink, children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443" })] }))] }));
}
