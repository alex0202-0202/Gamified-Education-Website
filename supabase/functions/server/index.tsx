import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
const app = new Hono();
const allowedOrigins = (Deno.env.get("ALLOWED_ORIGINS") ?? "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Enable logger
app.use('*', logger(console.log));

// Restrict CORS to configured school/deployment origins.
app.use(
  "/*",
  cors({
    origin: (origin) => (origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0]),
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-bbdaf045/health", (c) => {
  return c.json({ status: "ok" });
});

Deno.serve(app.fetch);
