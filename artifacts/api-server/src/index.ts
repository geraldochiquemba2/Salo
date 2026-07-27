import app from "./app";
import { logger } from "./lib/logger";
import cron from "node-cron";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");

  // Keep Render alive: ping external URL every 10 minutes
  if (process.env.NODE_ENV === "production") {
    const RENDER_URL = process.env.RENDER_EXTERNAL_URL || "https://salo-4csx.onrender.com";
    cron.schedule("*/10 * * * *", async () => {
      try {
        const res = await fetch(`${RENDER_URL}/api/healthz`);
        const data = (await res.json()) as { ok?: boolean };
        logger.info({ status: res.status, ok: data.ok }, "[KeepAlive] ping OK");
      } catch (e: any) {
        logger.warn({ error: e.message }, "[KeepAlive] ping failed");
      }
    });
    logger.info({ url: RENDER_URL }, "[KeepAlive] auto-ping activo a cada 10 min");
  }
});
