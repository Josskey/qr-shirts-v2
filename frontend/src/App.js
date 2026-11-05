import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./admin/LoginPage";
import ProtectedRoute from "./admin/ProtectedRoute";
import AdminLayout from "./admin/AdminLayout";
import DashboardPage from "./admin/DashboardPage";
import UsersPage from "./admin/UsersPage";
import UserDetailsPage from "./admin/UserDetailsPage";
import ShirtsPage from "./admin/ShirtsPage";
import ShirtDetailsPage from "./admin/ShirtDetailsPage";
import BatchesPage from "./admin/BatchesPage";
import BatchDetailsPage from "./admin/BatchDetailsPage";
import UserLoginPage from "./user/UserLoginPage";
import UserRegisterPage from "./user/UserRegisterPage";
import UserProtectedRoute from "./user/UserProtectedRoute";
import MyShirtsPage from "./user/MyShirtsPage";
import ClaimShirtPage from "./user/ClaimShirtPage";
import UserShirtPage from "./user/UserShirtPage";
import ProfilePage from "./user/ProfilePage";
import UserLayout from "./user/UserLayout";
import ActivateInfoPage from "./user/ActivateInfoPage";
export default function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/adm/dashboard" }) }), _jsx(Route, { path: "/adm/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/login", element: _jsx(UserLoginPage, {}) }), _jsx(Route, { path: "/register", element: _jsx(UserRegisterPage, {}) }), _jsx(Route, { path: "/activate-info", element: _jsx(ActivateInfoPage, {}) }), _jsxs(Route, { element: _jsx(UserProtectedRoute, { children: _jsx(UserLayout, {}) }), children: [_jsx(Route, { path: "/my-shirts", element: _jsx(MyShirtsPage, {}) }), _jsx(Route, { path: "/my-shirts/:publicId", element: _jsx(UserShirtPage, {}) }), _jsx(Route, { path: "/profile", element: _jsx(ProfilePage, {}) }), _jsx(Route, { path: "/claim", element: _jsx(ClaimShirtPage, {}) })] }), _jsxs(Route, { path: "/adm", element: _jsx(ProtectedRoute, { children: _jsx(AdminLayout, {}) }), children: [_jsx(Route, { path: "dashboard", element: _jsx(DashboardPage, {}) }), _jsx(Route, { path: "users", element: _jsx(UsersPage, {}) }), _jsx(Route, { path: "users/:id", element: _jsx(UserDetailsPage, {}) }), _jsx(Route, { path: "shirts", element: _jsx(ShirtsPage, {}) }), _jsx(Route, { path: "shirts/:id", element: _jsx(ShirtDetailsPage, {}) }), _jsx(Route, { path: "batches", element: _jsx(BatchesPage, {}) }), _jsx(Route, { path: "batches/:id", element: _jsx(BatchDetailsPage, {}) })] })] }));
}
