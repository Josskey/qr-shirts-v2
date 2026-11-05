import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
export default function UserProtectedRoute({ children }) {
    const token = localStorage.getItem("userToken");
    if (!token) {
        return (_jsx(Navigate, { to: "/login" }));
    }
    return children;
}
