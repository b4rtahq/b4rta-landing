import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const KEY = "b4rtafit:weekly_capacity";

function json(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const data = (await redis.get(KEY)) ?? null;
      return json(res, 200, { ok: true, data });
    }

    if (req.method === "POST") {
      const pin = req.headers["x-admin-pin"];
      if (!pin || pin !== process.env.ADMIN_PIN) {
        return json(res, 401, { ok: false, error: "UNAUTHORIZED" });
      }

      let body = "";
      await new Promise((resolve) => {
        req.on("data", (c) => (body += c));
        req.on("end", resolve);
      });

      const payload = JSON.parse(body || "{}");
      // payload legyen pl: { weeks: [...] }
      await redis.set(KEY, payload);

      return json(res, 200, { ok: true });
    }

    return json(res, 405, { ok: false, error: "METHOD_NOT_ALLOWED" });
  } catch (e) {
    return json(res, 500, { ok: false, error: "SERVER_ERROR", detail: String(e) });
  }
}
