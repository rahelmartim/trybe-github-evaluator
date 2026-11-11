import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { handleEvaluationRequest } from "./server/handler.js";

/** Serves the Vercel function in `api/evaluation.ts` during `npm run dev`. */
function evaluationApi(token: string | undefined): Plugin {
  return {
    name: "evaluation-api",
    configureServer(server) {
      server.middlewares.use("/api/evaluation", async (req, res) => {
        const request = new Request(new URL(req.originalUrl ?? req.url ?? "/", "http://localhost"), {
          method: req.method,
        });
        const response = await handleEvaluationRequest(request, token);
        res.statusCode = response.status;
        response.headers.forEach((value, key) => res.setHeader(key, value));
        res.end(await response.text());
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load every variable from .env, not only VITE_*. The token stays on the server.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), evaluationApi(env.GITHUB_TOKEN)],
  };
});
