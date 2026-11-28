
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Главная — загружаем сразу для максимально быстрой первой отрисовки
import LandingPage from "./public/LandingPage";

// Защитные компоненты — оставляем обычными импортами

const ProtectedRoute = lazy(() => import("./admin/ProtectedRoute"));
const UserProtectedRoute = lazy(() => import("./user/UserProtectedRoute"));

// Остальные страницы загружаются только при переходе на них
const LoginPage = lazy(() => import("./admin/LoginPage"));

const MarketPage = lazy(() => import("./public/MarketPage"));

const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const DashboardPage = lazy(() => import("./admin/DashboardPage"));

const UsersPage = lazy(() => import("./admin/UsersPage"));
const UserDetailsPage = lazy(() => import("./admin/UserDetailsPage"));

const ShirtsPage = lazy(() => import("./admin/ShirtsPage"));
const ShirtDetailsPage = lazy(() => import("./admin/ShirtDetailsPage"));

const BatchesPage = lazy(() => import("./admin/BatchesPage"));
const BatchDetailsPage = lazy(() => import("./admin/BatchDetailsPage"));

const UserLoginPage = lazy(() => import("./user/UserLoginPage"));
const UserRegisterPage = lazy(() => import("./user/UserRegisterPage"));

const MyShirtsPage = lazy(() => import("./user/MyShirtsPage"));
const ClaimShirtPage = lazy(() => import("./user/ClaimShirtPage"));
const UserShirtPage = lazy(() => import("./user/UserShirtPage"));

const ProfilePage = lazy(() => import("./user/ProfilePage"));
const UserLayout = lazy(() => import("./user/UserLayout"));

const ActivateInfoPage = lazy(() => import("./user/ActivateInfoPage"));

// Юридические страницы и FAQ
const LegalPage = lazy(() => import("./pages/LegalPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const OfferPage = lazy(() => import("./pages/OfferPage"));
const CookiesPage = lazy(() => import("./pages/CookiesPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));

export default function App() {
  
  return (
    <Suspense fallback={null}>
      <Routes>

        {/* Главная */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* Каталог товаров CODTEXA */}
        <Route
          path="/market"
          element={<MarketPage />}
        />

        {/* Юридические страницы */}
        <Route
          path="/legal"
          element={<LegalPage />}
        />

        <Route
          path="/legal/privacy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/legal/terms"
          element={<TermsPage />}
        />

        <Route
          path="/legal/offer"
          element={<OfferPage />}
        />

        <Route
          path="/legal/cookies"
          element={<CookiesPage />}
        />

        {/* FAQ */}
        <Route
          path="/faq"
          element={<FaqPage />}
        />

        {/* Вход администратора */}
        <Route
          path="/adm/login"
          element={<LoginPage />}
        />

        {/* Авторизация пользователя */}
        <Route
          path="/login"
          element={<UserLoginPage />}
        />

        <Route
          path="/register"
          element={<UserRegisterPage />}
        />

        <Route
          path="/activate-info"
          element={<ActivateInfoPage />}
        />

        {/* Личный кабинет */}
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

        {/* Админ-панель */}
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
    </Suspense>
 
);
}
