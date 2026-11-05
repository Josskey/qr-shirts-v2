import {
  Navigate
} from "react-router-dom";

export default function ProtectedRoute({
  children
}: {
  children: React.ReactNode
}) {

  const token =
    localStorage.getItem(
      "adminToken"
    );

  if (!token) {
    return (
      <Navigate
        to="/adm/login"
      />
    );
  }

  return children;

}