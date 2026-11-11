import { handleEvaluationRequest } from "../server/handler.js";

// Vercel serverless function: GET /api/evaluation?user=<username>
export function GET(request: Request): Promise<Response> {
  return handleEvaluationRequest(request, process.env.GITHUB_TOKEN);
}
