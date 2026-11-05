import { Router } from "express";
import { pool } from "../db/pool.js";
import { authMiddleware, AuthRequest } from "../middleware/auth.js";
import { sha256 } from "../utils/random.js";

const router = Router();

router.post(
  "/claim",
  authMiddleware,
  async (
    req: AuthRequest,
    res
  ) => {

    const { claimCode } =
      req.body;

    if (!claimCode) {
      return res.status(400).json({
        error: "Введите код активации"
      });
    }

    const tokenResult =
      await pool.query(
        `
        SELECT
          *
        FROM claim_tokens
        WHERE token_hash=$1
        `,
        [ sha256( claimCode ) ]
      );

    const token =
      tokenResult.rows[0];

    if (!token) {
      return res.status(404).json({
        error: "Код не найден"
      });
    }

    if (token.used_at) {
      return res.status(400).json({
        error: "Код уже использован"
      });
    }

    const shirtResult =
      await pool.query(
        `
        SELECT *
        FROM shirts
        WHERE id=$1
        `,
        [token.shirt_id]
      );

    const shirt =
      shirtResult.rows[0];
if (
  shirt.state !== "unclaimed"
) {

  return res.status(400).json({
    error:
      "Футболка уже активирована"
  });

}
    await pool.query("BEGIN");

    try {

      await pool.query(
        `
        INSERT INTO ownerships
        (
          shirt_id,
          user_id,
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
          shirt.id,
          req.user?.uid
        ]
      );

      await pool.query(
        `
        UPDATE shirts
        SET state='claimed'
        WHERE id=$1
        `,
        [shirt.id]
      );

      await pool.query(
        `
        UPDATE claim_tokens
        SET used_at=NOW()
        WHERE id=$1
        `,
        [token.id]
      );

      await pool.query("COMMIT");

      res.json({
        ok: true,
        publicId: shirt.public_id
      });

    } catch (err) {

      await pool.query(
        "ROLLBACK"
      );

      throw err;

    }

  }
);
router.get(
  "/my",
  authMiddleware,
  async (
    req: AuthRequest,
    res
  ) => {

    const result =
      await pool.query(
        `
        SELECT
          s.id,
          s.public_id,
          s.state,
          s.created_at
        FROM ownerships o
        JOIN shirts s
          ON s.id = o.shirt_id
        WHERE
          o.user_id = $1
          AND o.active = true
        ORDER BY s.created_at DESC
        `,
        [req.user?.uid]
      );

    res.json(
      result.rows
    );

  }
);
router.put(
  "/:publicId/link",
  authMiddleware,
  async (
    req: AuthRequest,
    res
  ) => {

    const { publicId } =
      req.params;

    const { url } =
      req.body;

    if (!url) {
      return res.status(400).json({
        error: "Введите ссылку"
      });
    }

    const ownerResult =
  await pool.query(
    `
    SELECT
      s.id,
      s.state
    FROM ownerships o
    JOIN shirts s
      ON s.id = o.shirt_id
    WHERE
      s.public_id = $1
      AND o.user_id = $2
      AND o.active = true
    `,
    [
      publicId,
      req.user?.uid
    ]
  );

    const owner =
      ownerResult.rows[0];

    if (!owner) {
      return res.status(403).json({
        error: "Не ваша футболка"
      });
    }
    if (
  owner.state === "blocked"
) {

  return res.status(403).json({
    error:
      "Футболка заблокирована"
  });

}

    await pool.query(
      `
      UPDATE target_links
      SET active=false
      WHERE shirt_id=$1
      `,
      [owner.id]
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
        owner.id,
        url
      ]
    );

    res.json({
      ok: true
    });

  }
);
router.get(
  "/redirect/:publicId",
  async (req, res) => {

    const { publicId } =
      req.params;

    const shirtResult =
      await pool.query(
        `
        SELECT
          id,
          state
        FROM shirts
        WHERE public_id = $1
        `,
        [publicId]
      );

    const shirt =
      shirtResult.rows[0];

    if (!shirt) {

      return res.status(404).json({
        error:
          "Футболка не найдена"
      });

    }

    if (
      shirt.state === "unclaimed"
    ) {

      return res.redirect(
        302,
        `${process.env.FRONTEND_URL}/activate-info`
      );

    }

    if (
      shirt.state === "blocked"
    ) {

      return res.status(403).json({
        error:
          "Футболка заблокирована"
      });

    }

    const linkResult =
      await pool.query(
        `
        SELECT
          url
        FROM target_links
        WHERE
          shirt_id = $1
          AND active = true
        LIMIT 1
        `,
        [shirt.id]
      );

    const link =
      linkResult.rows[0];

    if (!link) {

      return res.status(404).json({
        error:
          "Ссылка не настроена"
      });

    }

    await pool.query(
      `
      INSERT INTO scan_events
      (
        shirt_id,
        result
      )
      VALUES
      (
        $1,
        'redirect'
      )
      `,
      [shirt.id]
    );

    return res.redirect(
      302,
      link.url
    );

  }
);
router.get(
  "/:publicId",
  authMiddleware,
  async (
    req: AuthRequest,
    res
  ) => {

    const { publicId } =
      req.params;

    const result =
      await pool.query(
        `
        SELECT
  s.public_id,
  s.state,
  tl.url

        FROM ownerships o
        JOIN shirts s
          ON s.id = o.shirt_id
        LEFT JOIN target_links tl
          ON tl.shirt_id = s.id
          AND tl.active = true
        WHERE
          o.user_id = $1
          AND o.active = true
          AND s.public_id = $2
        LIMIT 1
        `,
        [
          req.user?.uid,
          publicId
        ]
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
router.delete(
  "/:publicId/link",
  authMiddleware,
  async (
    req: AuthRequest,
    res
  ) => {

    const { publicId } =
      req.params;

    const ownerResult =
      await pool.query(
        `
        SELECT
          s.id
        FROM ownerships o
        JOIN shirts s
          ON s.id = o.shirt_id
        WHERE
          s.public_id = $1
          AND o.user_id = $2
          AND o.active = true
        `,
        [
          publicId,
          req.user?.uid
        ]
      );

    const owner =
      ownerResult.rows[0];

    if (!owner) {

      return res.status(403).json({
        error: "Не ваша футболка"
      });

    }

    await pool.query(
      `
      UPDATE target_links
      SET active=false
      WHERE shirt_id=$1
      `,
      [owner.id]
    );

    res.json({
      ok: true
    });

  }
);

router.get(
  "/:publicId/stats",
  authMiddleware,
  async (
    req: AuthRequest,
    res
  ) => {

    const { publicId } =
      req.params;

    const ownerResult =
      await pool.query(
        `
        SELECT
          s.id
        FROM ownerships o
        JOIN shirts s
          ON s.id = o.shirt_id
        WHERE
          o.user_id = $1
          AND s.public_id = $2
          AND o.active = true
        `,
        [
          req.user?.uid,
          publicId
        ]
      );

    const owner =
      ownerResult.rows[0];

    if (!owner) {
      return res.status(403).json({
        error: "Не ваша футболка"
      });
    }

    const statsResult =
      await pool.query(
        `
        SELECT
          COUNT(*) AS scans
        FROM scan_events
        WHERE shirt_id=$1
        `,
        [owner.id]
      );

    res.json({
      publicId,
      scans: Number(
        statsResult.rows[0].scans
      )
    });

  }
);
``
export default router;