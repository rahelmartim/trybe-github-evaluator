import { isValidUsername } from "../shared/evaluation.js";
import { evaluateProfile } from "./evaluate.js";
import { GitHubClient } from "./github.js";

function json(status: number, body: unknown, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

/** Handles `GET /api/evaluation?user=<username>`. */
export async function handleEvaluationRequest(
  request: Request,
  token: string | undefined,
): Promise<Response> {
  if (request.method !== "GET") {
    return json(405, { error: "Method not allowed" }, { Allow: "GET" });
  }

  const username = new URL(request.url).searchParams.get("user") ?? "";
  if (!isValidUsername(username)) {
    return json(400, { error: "Invalid GitHub username" });
  }
  if (!token) {
    console.error("GITHUB_TOKEN is not set");
    return json(500, { error: "Server is not configured" });
  }

  try {
    const result = await evaluateProfile(new GitHubClient(token), username);
    if (!result) return json(404, { error: "User not found" });
    return json(200, result, {
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
    });
  } catch (error) {
    console.error("Evaluation failed:", error);
    return json(502, { error: "Could not evaluate the profile" });
  }
}
