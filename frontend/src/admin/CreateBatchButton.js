import { jsx as _jsx } from "react/jsx-runtime";
import { http } from "../api/http";
export default function CreateBatchButton() {
    async function createBatch() {
        const count = prompt("Сколько футболок создать?");
        if (!count) {
            return;
        }
        await http.post("/admin/batches/create", {
            count: Number(count)
        });
        window.location.reload();
    }
    return (_jsx("button", { onClick: createBatch, children: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0430\u0440\u0442\u0438\u044E" }));
}
