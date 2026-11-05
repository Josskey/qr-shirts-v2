import { Router } from "express";
import bcrypt from "bcrypt";

import { pool } from "../db/pool.js";
import { signJwt } from "../utils/security.js";

import {
  authMiddleware,
  AuthRequest
} from "../middleware/auth.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {

    const { email, password } = req.body;

    if (
  !email ||
  !password
) {

  return res.status(400).json({
    error: "Введите email и пароль"
  });

}

if (
  password.length < 6
) {

  return res.status(400).json({
    error:
      "Пароль должен содержать минимум 6 символов"
  });

}

    const passwordHash =
      await bcrypt.hash(password, 12);

    const result = await pool.query(
      `
      INSERT INTO users
      (
        email,
        password_hash
      )
      VALUES
      (
        $1,
        $2
      )
      RETURNING id
      `,
      [
        email,
        passwordHash
      ]
    );

    const token = signJwt({
      uid: result.rows[0].id,
      email
    });

    res.json({
      token
    });

  } catch (err: any) {

    if (err.code === "23505") {
      return res.status(409).json({
        error: "Email уже существует"
      });
    }

    console.error(err);

    res.status(500).json({
      error: "Ошибка регистрации"
    });

  }
});

router.post("/login", async (req, res) => {

  const {
    email,
    password
  } = req.body;

  const result = await pool.query(
    `
    SELECT
  id,
  password_hash,
  status
FROM users
WHERE email=$1
    `,
    [email]
  );

  const user = result.rows[0];

  if (!user) {
    return res.status(401).json({
      error: "Неверный логин или пароль"
    });
  }

  const ok =
    await bcrypt.compare(
      password,
      user.password_hash
    );

  if (!ok) {
    return res.status(401).json({
      error: "Неверный логин или пароль"
    });
  }
  if (
  user.status === "blocked"
) {

  return res.status(403).json({
    error:
      "Аккаунт заблокирован"
  });

}

  const token = signJwt({
    uid: user.id,
    email
  });

  res.json({
  token
});

});

router.get(
  "/me",
  authMiddleware,
  async (
    req: AuthRequest,
    res
  ) => {

    const result =
      await pool.query(
        `
        SELECT
          id,
          email,
          status,
          created_at
        FROM users
        WHERE id=$1
        `,
        [req.user?.uid]
      );

    const user =
      result.rows[0];

    res.json(user);

  }
);

export default router;