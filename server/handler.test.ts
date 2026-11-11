import { describe, expect, it } from "vitest";
import { handleEvaluationRequest } from "./handler.js";

const request = (query: string, method = "GET") =>
  new Request(`http://localhost/api/evaluation${query}`, { method });

describe("handleEvaluationRequest", () => {
  it("rejects methods other than GET", async () => {
    const response = await handleEvaluationRequest(request("?user=dev", "POST"), "token");
    expect(response.status).toBe(405);
  });

  it("rejects an invalid username", async () => {
    const response = await handleEvaluationRequest(request("?user=bad%20name"), "token");
    expect(response.status).toBe(400);
  });

  it("fails when the token is missing", async () => {
    const response = await handleEvaluationRequest(request("?user=dev"), undefined);
    expect(response.status).toBe(500);
  });
});
