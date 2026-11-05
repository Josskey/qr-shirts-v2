import { useState } from "react";

import { http } from "../api/http";

export default function ClaimShirtPage() {

  const [claimCode, setClaimCode] =
    useState("");

  async function submit() {

    try {

      const token =
        localStorage.getItem(
          "userToken"
        );

      const res =
        await http.post(
          "/api/shirts/claim",
          {
            claimCode
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      alert(
        `Футболка активирована: ${res.data.publicId}`
      );

      setClaimCode("");

    } catch (err: any) {

      alert(
        err?.response?.data?.error ||
        "Ошибка активации"
      );

    }

  }

  return (

    <div className="page">

      <h1 className="page-title">
        Активация футболки
      </h1>

      <div className="card">

        <input
          className="input"
          placeholder="Введите claim-код"
          value={claimCode}
          onChange={(e) =>
            setClaimCode(
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
          Активировать
        </button>

      </div>

    </div>

  );

}