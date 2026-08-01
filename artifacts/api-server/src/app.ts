import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "path";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

const siteUrl = process.env.SITE_URL || "http://localhost:3000";
const allowedOrigins = [siteUrl, "http://localhost:5173", "http://localhost:3000"];

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const frontendDist = path.resolve(import.meta.dirname, "../../carreira-360/dist/public");
app.use(express.static(frontendDist));
app.get("*splat", (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

export default app;
