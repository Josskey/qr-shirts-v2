import { Router } from "express";
import bcrypt from "bcrypt";
import { generateQr } from "../utils/qr.js";
import { pool } from "../db/pool.js";
import { signJwt } from "../utils/security.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { randomCode, publicId, sha256 } from "../utils/random.js";
import QRCode from "qrcode";


const router = Router();

router.post(
  "/login",
  async (req, res) => {

    const {
      email,
      password
    } = req.body;

    const result =
      await pool.query(
        `
        SELECT
          id,
          email,
          password_hash
        FROM admins
        WHERE email=$1
        `,
        [email]
      );

    const admin =
      result.rows[0];

    if (!admin) {
      return res.status(401).json({
        error: "Неверный логин или пароль"
      });
    }

    const ok =
      await bcrypt.compare(
        password,
        admin.password_hash
      );

    if (!ok) {
      return res.status(401).json({
        error: "Неверный логин или пароль"
      });
    }

    const token =
      signJwt({
        aid: admin.id,
        email: admin.email,
        role: "admin"
      });

    await pool.query(
      `
      UPDATE admins
      SET last_login_at = NOW()
      WHERE id=$1
      `,
      [admin.id]
    );

    res.json({
      token
    });

  }
);
router.get(
  "/users",
  adminAuth,
  async (_, res) => {

    const result =
      await pool.query(
        `
        SELECT
          id,
          email,
          status,
          created_at
        FROM users
        ORDER BY created_at DESC
        `
      );

    res.json(
      result.rows
    );

  }
);
router.get(
  "/shirts",
  adminAuth,
  async (_, res) => {

    const result =
      await pool.query(
        `
        SELECT
          s.id,
          s.public_id,
          s.state,
          s.created_at,

          (
            SELECT u.email
            FROM ownerships o
            JOIN users u
              ON u.id = o.user_id
            WHERE
              o.shirt_id = s.id
              AND o.active = true
            LIMIT 1
          ) AS owner_email,

          (
            SELECT COUNT(*)
            FROM scan_events se
            WHERE se.shirt_id = s.id
          ) AS scans

        FROM shirts s

        ORDER BY s.created_at DESC
        `
      );

    res.json(
      result.rows
    );

  }
);
router.post(
  "/batches/create",
  adminAuth,
  async (
    req,
    res
  ) => {

    const count =
      Number(req.body.count);

    if (
      !count ||
      count < 1
    ) {

      return res.status(400).json({
        error: "Укажите количество"
      });

    }
const batch =
  await pool.query(
    `
    INSERT INTO batches
    (
      name
    )
    VALUES
    (
      $1
    )
    RETURNING id
    `,
    [
      `Batch ${Date.now()}`
    ]
  );

const batchId =
  batch.rows[0].id;
  
    const created = [];

    for (
      let i = 0;
      i < count;
      i++
    ) {

      const pid =
        publicId();

      const claimCode =
        randomCode(8);

      const shirt =
  await pool.query(
    `
    INSERT INTO shirts
    (
      public_id,
      state,
      batch_id
    )
    VALUES
    (
      $1,
      'unclaimed',
      $2
    )
    RETURNING id, public_id
    `,
    [
      pid,
      batchId
    ]
  );
      await pool.query(
        `
        INSERT INTO claim_tokens
        (
          shirt_id,
          token_hash,
          original_code,
          expires_at
        )
        VALUES
        (
          $1,
          $2,
          $3,
          NOW() + INTERVAL '365 days'
        )
        `,
        [
          shirt.rows[0].id,
          sha256(claimCode),
          claimCode
        ]
      );
const qr =
  await generateQr(
    `${process.env.BASE_URL}/api/shirts/redirect/${pid}`
  );
      created.push({
  publicId: pid,

  claimCode,

  qr
});

    }

    res.json({
  batchId,

  count,

  shirts:
    created
});

  }
);
router.get(
  "/shirts/:id",
  adminAuth,
  async (req, res) => {

    const { id } =
      req.params;

    const result =
      await pool.query(
        `
        SELECT
          s.id,
          s.public_id,
          s.state,
          s.created_at,

          (
  SELECT ct.original_code
  FROM claim_tokens ct
  WHERE
    ct.shirt_id = s.id
    AND ct.used_at IS NULL
  ORDER BY ct.id DESC
  LIMIT 1
) AS claim_code,

          (
            SELECT tl.url
            FROM target_links tl
            WHERE
              tl.shirt_id = s.id
              AND tl.active = true
            LIMIT 1
          ) AS current_url,

          (
            SELECT u.email
            FROM ownerships o
            JOIN users u
              ON u.id = o.user_id
            WHERE
              o.shirt_id = s.id
              AND o.active = true
            LIMIT 1
          ) AS owner_email,

          (
            SELECT COUNT(*)
            FROM scan_events se
            WHERE se.shirt_id = s.id
          ) AS scans

        FROM shirts s

        WHERE s.id = $1
        `,
        [id]
      );

    const shirt =
      result.rows[0];

    if (!shirt) {

      return res.status(404).json({
        error: "Футболка не найдена"
      });

    }

    res.json(shirt);

  }
);
router.post(
  "/shirts/:id/block",
  adminAuth,
  async (req, res) => {

    const { id } =
      req.params;

    const shirtResult =
      await pool.query(
        `
        SELECT state
        FROM shirts
        WHERE id=$1
        `,
        [id]
      );

    const shirt =
      shirtResult.rows[0];

    if (!shirt) {

      return res.status(404).json({
        error: "Футболка не найдена"
      });

    }

    if (
      shirt.state === "unclaimed"
    ) {

      return res.status(400).json({
        error:
          "Нельзя блокировать неактивированную футболку"
      });

    }

    await pool.query(
      `
      UPDATE shirts
      SET state='blocked'
      WHERE id=$1
      `,
      [id]
    );

    res.json({
      ok: true
    });

  }
);

router.post(
  "/shirts/:id/unblock",
  adminAuth,
  async (req, res) => {

    const { id } =
      req.params;

    await pool.query(
      `
      UPDATE shirts
      SET state='claimed'
      WHERE id=$1
      `,
      [id]
    );

    res.json({
      ok: true
    });

  }
);
router.post(
  "/shirts/:id/unassign",
  adminAuth,
  async (req, res) => {

    const { id } =
      req.params;

    await pool.query(
      `
      UPDATE ownerships
      SET active = false
      WHERE shirt_id = $1
        AND active = true
      `,
      [id]
    );

    await pool.query(
      `
      UPDATE shirts
      SET state = 'unclaimed'
      WHERE id = $1
      `,
      [id]
    );

    res.json({
      ok: true
    });

  }
);
router.post(
  "/shirts/:id/regenerate-claim",
  adminAuth,
  async (req, res) => {

    const { id } =
      req.params;

    const newCode =
      randomCode(8);

    await pool.query(
      `
      UPDATE claim_tokens
      SET used_at = NOW()
      WHERE shirt_id = $1
        AND used_at IS NULL
      `,
      [id]
    );

    await pool.query(
      `
      INSERT INTO claim_tokens
      (
        shirt_id,
        token_hash,
        original_code,
        expires_at
      )
      VALUES
      (
        $1,
        $2,
        $3,
        NOW() + INTERVAL '365 days'
      )
      `,
      [
        id,
        sha256(newCode),
        newCode
      ]
    );

    res.json({
      claimCode:
        newCode
    });

  }
);

router.put(
  "/shirts/:id/link",
  adminAuth,
  async (req, res) => {

    const { id } = req.params;

    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        error: "Введите ссылку"
      });
    }

    await pool.query(
      `
      UPDATE target_links
      SET active = false
      WHERE shirt_id = $1
      `,
      [id]
    );

    await pool.query(
      `
      INSERT INTO target_links
      (
        shirt_id,
        url,
        active
      )
      VALUES
      (
        $1,
        $2,
        true
      )
      `,
      [
        id,
        url
      ]
    );

    res.json({
      ok: true
    });

  }
);
router.delete(
  "/shirts/:id/link",
  adminAuth,
  async (req, res) => {

    const { id } =
      req.params;

    await pool.query(
      `
      UPDATE target_links
      SET active = false
      WHERE shirt_id = $1
      `,
      [id]
    );

    res.json({
      ok: true
    });

  }
);

router.get(
  "/users/:id",
  adminAuth,
  async (req, res) => {

    const { id } = req.params;

    const userResult =
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
        [id]
      );

    const user =
      userResult.rows[0];

    if (!user) {
      return res.status(404).json({
        error: "Пользователь не найден"
      });
    }

    const shirtsResult =
      await pool.query(
        `
        SELECT
          s.id,
          s.public_id,
          s.state,

          (
            SELECT COUNT(*)
            FROM scan_events se
            WHERE se.shirt_id = s.id
          ) AS scans

        FROM ownerships o
        JOIN shirts s
          ON s.id = o.shirt_id

        WHERE
          o.user_id = $1
          AND o.active = true
        `,
        [id]
      );

    res.json({
      user,
      shirts: shirtsResult.rows
    });

  }
);
router.post(
  "/users/:id/block",
  async (req, res) => {

    const { id } =
      req.params;

    await pool.query(
      `
      UPDATE users
      SET status='blocked'
      WHERE id=$1
      `,
      [id]
    );

    res.json({
      ok: true
    });

  }
);
router.post(
  "/users/:id/unblock",
  async (req, res) => {

    const { id } =
      req.params;

    await pool.query(
      `
      UPDATE users
      SET status='active'
      WHERE id=$1
      `,
      [id]
    );

    res.json({
      ok: true
    });

  }
);

router.get(
  "/shirts/:id/qr",
  async (
    req,
    res
  ) => {

    const { id } =
      req.params;

    const shirtResult =
      await pool.query(
        `
        SELECT
          public_id
        FROM shirts
        WHERE id = $1
        `,
        [id]
      );

    const shirt =
      shirtResult.rows[0];

    if (!shirt) {
      return res.status(404).json({
        error: "Футболка не найдена"
      });
    }

    const dataUrl =
      await QRCode.toDataURL(
        `${process.env.BASE_URL}/api/shirts/redirect/${shirt.public_id}`
      );

    const base64 =
      dataUrl.replace(
        /^data:image\/png;base64,/,
        ""
      );

    const buffer =
      Buffer.from(
        base64,
        "base64"
      );

    res.setHeader(
      "Content-Type",
      "image/png"
    );

    res.setHeader(
  "Cache-Control",
  "no-store"
);

    res.send(buffer);

  }
);
router.get(
  "/shirts/:id/qr/download",
  async (
    req,
    res
  ) => {

    const { id } =
      req.params;

    const shirtResult =
      await pool.query(
        `
        SELECT
          public_id
        FROM shirts
        WHERE id = $1
        `,
        [id]
      );

    const shirt =
      shirtResult.rows[0];

    if (!shirt) {

      return res.status(404).json({
        error:
          "Футболка не найдена"
      });

    }

    const dataUrl =
      await QRCode.toDataURL(
        `${process.env.BASE_URL}/api/shirts/redirect/${shirt.public_id}`
      );

    const base64 =
      dataUrl.replace(
        /^data:image\/png;base64,/,
        ""
      );

    const buffer =
      Buffer.from(
        base64,
        "base64"
      );

    res.setHeader(
      "Content-Type",
      "image/png"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${shirt.public_id}.png`
    );

    res.setHeader(
  "Cache-Control",
  "no-store"
);

    res.send(buffer);

  }
);

router.get(
  "/batches",
  adminAuth,
  async (_, res) => {

    const result =
      await pool.query(
        `
        SELECT
          b.id,
          b.name,
          b.created_at,

          (
            SELECT COUNT(*)
            FROM shirts s
            WHERE s.batch_id = b.id
          ) AS shirts_count

        FROM batches b

        ORDER BY b.created_at DESC
        `
      );

    res.json(
      result.rows
    );

  }
);
router.get(
  "/batches/:id",
  adminAuth,
  async (
    req,
    res
  ) => {

    const { id } =
      req.params;

    const batchResult =
      await pool.query(
        `
        SELECT *
        FROM batches
        WHERE id = $1
        `,
        [id]
      );

    const batch =
      batchResult.rows[0];

    if (!batch) {
      return res.status(404).json({
        error: "Партия не найдена"
      });
    }

    const shirtsResult =
      await pool.query(
        `
        SELECT
          id,
          public_id,
          state,
          created_at
        FROM shirts
        WHERE batch_id = $1
        ORDER BY created_at
        `,
        [id]
      );

    res.json({
      batch,
      shirts:
        shirtsResult.rows
    });

  }
);
router.get(
  "/batches/:id/export",
  adminAuth,
  async (
    req,
    res
  ) => {

    const { id } =
      req.params;

    const result =
  await pool.query(
    `
    SELECT
      s.public_id,

      (
        SELECT ct.original_code
        FROM claim_tokens ct
        WHERE ct.shirt_id = s.id
        ORDER BY ct.id DESC
        LIMIT 1
      ) AS original_code

    FROM shirts s

    WHERE s.batch_id = $1

    ORDER BY s.created_at
    `,
    [id]
  );

    const csvRows = [
      "public_id,claim_code"
    ];

    for (
      const row of result.rows
    ) {

      csvRows.push(
        `${row.public_id},${row.original_code}`
      );

    }

    const csv =
      csvRows.join("\n");

    res.setHeader(
      "Content-Type",
      "text/csv"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=batch-${id}.csv`
    );

    res.send(csv);

  }
);
router.get(
  "/stats",
  adminAuth,
  async (_, res) => {

    const users =
      await pool.query(
        "SELECT COUNT(*) FROM users"
      );

    const shirts =
      await pool.query(
        "SELECT COUNT(*) FROM shirts"
      );

    const batches =
      await pool.query(
        "SELECT COUNT(*) FROM batches"
      );

    const scans =
      await pool.query(
        "SELECT COUNT(*) FROM scan_events"
      );

    res.json({
      users:
        Number(
          users.rows[0].count
        ),

      shirts:
        Number(
          shirts.rows[0].count
        ),

      batches:
        Number(
          batches.rows[0].count
        ),

      scans:
        Number(
          scans.rows[0].count
        )
    });

  }
);
export default router;