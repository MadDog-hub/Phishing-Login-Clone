import express, { type Express } from "express";
import cors from "cors";
import router from "./routes";

const app: Express = express();

// In production, restrict CORS to allowed frontend domains.
// FRONTEND_URL can be a comma-separated list of origins.
// In development (Replit), allow all origins.
const rawFrontendUrl = process.env.FRONTEND_URL;
const allowedOrigins = rawFrontendUrl
  ? rawFrontendUrl.split(",").map((u) => u.trim().replace(/\/+$/, "")).filter(Boolean)
  : [];

app.use(
  cors(
    allowedOrigins.length > 0
      ? {
          origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
              callback(null, true);
            } else {
              callback(new Error(`CORS: origin ${origin} not allowed`));
            }
          },
          credentials: true,
        }
      : undefined,
  ),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
