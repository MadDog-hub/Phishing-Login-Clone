import express, { type Express } from "express";
import cors from "cors";
import router from "./routes";

const app: Express = express();

// In production, restrict CORS to the frontend domain (set FRONTEND_URL on Railway).
// In development (Replit), allow all origins.
const rawFrontendUrl = process.env.FRONTEND_URL;
const frontendOrigin = rawFrontendUrl ? rawFrontendUrl.replace(/\/+$/, "") : undefined;

app.use(
  cors(
    frontendOrigin
      ? {
          origin: (origin, callback) => {
            if (!origin || origin === frontendOrigin) {
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
