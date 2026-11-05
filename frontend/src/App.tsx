import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

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

  return (

    <Routes>

      <Route
        path="/"
        element={
          <Navigate to="/adm/dashboard" />
        }
      />

      {/* Admin Login */}

      <Route
        path="/adm/login"
        element={<LoginPage />}
      />

      {/* User Login */}

      <Route
        path="/login"
        element={<UserLoginPage />}
      />

      {/* User Register */}

      <Route
        path="/register"
        element={<UserRegisterPage />}
      />
<Route
  path="/activate-info"
  element={<ActivateInfoPage />}
/>

      {/* User Area */}

      <Route
  element={
    <UserProtectedRoute>
      <UserLayout />
    </UserProtectedRoute>
  }
>

  <Route
    path="/my-shirts"
    element={<MyShirtsPage />}
  />

  <Route
    path="/my-shirts/:publicId"
    element={<UserShirtPage />}
  />

  <Route
    path="/profile"
    element={<ProfilePage />}
  />

  <Route
    path="/claim"
    element={<ClaimShirtPage />}
  />

</Route>

      {/* Admin Area */}

      <Route
        path="/adm"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >

        <Route
          path="dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="users"
          element={<UsersPage />}
        />

        <Route
          path="users/:id"
          element={<UserDetailsPage />}
        />

        <Route
          path="shirts"
          element={<ShirtsPage />}
        />

        <Route
          path="shirts/:id"
          element={<ShirtDetailsPage />}
        />

        <Route
          path="batches"
          element={<BatchesPage />}
        />

        <Route
          path="batches/:id"
          element={<BatchDetailsPage />}
        />

      </Route>

    </Routes>

  );

}