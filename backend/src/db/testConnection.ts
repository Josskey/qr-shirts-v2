import { pool } from "./pool.js";

export async function testConnection() {
  try {
    const result = await pool.query(
      "SELECT current_database(), now()"
    );

    console.log("✅ PostgreSQL connected");

    console.log(
      "Database:",
      result.rows[0].current_database
    );

    console.log(
      "Time:",
      result.rows[0].now
    );

  } catch (err) {
    console.error("❌ PostgreSQL connection error");
    console.error(err);
  }
}