import express, { type Express } from "express";
import cors from "cors";
import router from "./routes";

const app: Express = express();

// In production, restrict CORS to the frontend domain (set FRONTEND_URL on Railway).
// In development (Replit), allow all origins.
const frontendUrl = process.env.FRONTEND_URL;
app.use(
  cors(
    frontendUrl
      ? {
          origin: [frontendUrl],
          credentials: true,
        }
      : undefined,
  ),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
