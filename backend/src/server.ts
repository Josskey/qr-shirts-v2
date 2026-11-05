import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import shirtsRouter from "./routes/shirts.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";

import { testConnection } from "./db/testConnection.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);

app.get("/health", (_, res) => {

  res.json({
    ok: true,
    service: "qr-shirts-backend",
  });

});

app.use("/api/auth", authRouter);
app.use("/api/shirts", shirtsRouter);
app.use("/admin", adminRouter);

const port =
  Number(
    process.env.PORT || 4001
  );

app.listen(
  port,
  async () => {

    console.log(
      `Backend started on ${port}`
    );

    await testConnection();

  }
);
