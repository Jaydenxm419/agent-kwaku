import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

const PROJECT_ROOT = path.resolve(__dirname, "..");

export default defineConfig(({ mode }) => {
  // Load .env.local from the project root (not debug/) so we can read PORT
  // even though this config file lives under debug/.
  const env = loadEnv(mode, PROJECT_ROOT, "");
  const port = Number(env.PORT ?? process.env.PORT ?? 3456);

  // BOOP_DEBUG_TARGET: optional override to proxy /api + /ws at a remote
  // server (e.g. https://agent-kwaku.onrender.com) instead of localhost.
  // When unset, falls back to localhost:<PORT> for normal `npm run dev`.
  const remoteTarget = env.BOOP_DEBUG_TARGET ?? process.env.BOOP_DEBUG_TARGET;
  const httpTarget = remoteTarget ?? `http://localhost:${port}`;
  const wsTarget = remoteTarget
    ? remoteTarget.replace(/^http/, "ws")
    : `ws://localhost:${port}`;
  const isRemote = Boolean(remoteTarget);

  return {
    root: path.resolve(__dirname),
    envDir: PROJECT_ROOT,
    plugins: [react(), tailwindcss()],
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: httpTarget,
          changeOrigin: isRemote,
          secure: isRemote,
          rewrite: (p) => p.replace(/^\/api/, ""),
          configure: (proxy) => {
            proxy.on("error", () => {
              /* ignore — server may be restarting */
            });
          },
        },
        "/ws": {
          target: wsTarget,
          ws: true,
          changeOrigin: isRemote,
          secure: isRemote,
          configure: (proxy) => {
            proxy.on("error", () => {
              /* WS proxy EPIPE on reconnect is harmless */
            });
          },
        },
      },
    },
    build: { outDir: path.resolve(__dirname, "dist") },
  };
});
