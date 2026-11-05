import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { http } from "../api/http";

export default function UserRegisterPage() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function submit() {

    try {

      const res =
        await http.post(
          "/api/auth/register",
          {
            email,
            password
          }
        );

      localStorage.setItem(
        "userToken",
        res.data.token
      );

      navigate(
        "/my-shirts"
      );

    } catch (err: any) {

      alert(
        err?.response?.data?.error ||
        "Ошибка регистрации"
      );

    }

  }

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1 className="auth-title">
          Регистрация
        </h1>

        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <input
          className="input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <button
          className="primary-button"
          onClick={submit}
        >
          Зарегистрироваться
        </button>

      </div>

    </div>

  );

}
