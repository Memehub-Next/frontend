import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import next from "next";
import { Environment } from "./src/core/utils/environment";

const { port } = Environment;
const backendPort = 5000;
const app = next({ dev: true, hostname: "localhost", port });
const handle = app.getRequestHandler();
app
  .prepare()
  .then(() => {
    const server = express();
    server.use(
      "/graphql",
      createProxyMiddleware({
        target: `http://localhost:${backendPort}`,
        pathRewrite: { "^/graphql": "/graphql" },
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
        ws: false,
      })
    );
    server.use(
      "/api",
      createProxyMiddleware({
        target: `http://localhost:${backendPort}`,
        pathRewrite: { "^/api": "" },
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
        ws: false,
      })
    );
    server.all("*", (req, res) => handle(req, res));
    server.listen(port, () => console.log(`> Ready on http://localhost:${port}`));
  })
  .catch((err) => console.log("Error:::::", err));
