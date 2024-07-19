import express from "express";
import { createServer as createViteServer } from "vite";

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa", // don't include Vite's default HTML handling middlewares
  });

  // user defined routes first.
  app.get("/api/test", (_, res) => {
    return res.end("OK");
  });
  // Use vite's connect instance as middleware
  app.use(vite.middlewares);
  app.listen(3000, () => {
    console.log(`http://localhost:3000`);
  });
}

createServer();
