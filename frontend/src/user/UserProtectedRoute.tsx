import {
  Navigate
} from "react-router-dom";

export default function UserProtectedRoute({
  children
}: {
  children: React.ReactNode
}) {

  const token =
    localStorage.getItem(
      "userToken"
    );

  if (!token) {
    return (
      <Navigate
        to="/login"
      />
    );
  }

  return children;

}