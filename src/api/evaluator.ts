import type { EvaluationResult } from "../../shared/evaluation";
import { isValidUsername } from "../../shared/evaluation";

export { isValidUsername };

export interface Evaluation extends Omit<EvaluationResult, "evaluatedAt"> {
  evaluatedAt: Date;
}

export class UserNotFoundError extends Error {
  constructor(username: string) {
    super(`GitHub user "${username}" was not found`);
    this.name = "UserNotFoundError";
  }
}

export async function fetchEvaluation(
  username: string,
  signal?: AbortSignal,
): Promise<Evaluation> {
  if (!isValidUsername(username)) throw new UserNotFoundError(username);

  const response = await fetch(
    `/api/evaluation?user=${encodeURIComponent(username)}`,
    { signal },
  );
  if (response.status === 404) throw new UserNotFoundError(username);
  if (!response.ok) {
    throw new Error(`Evaluation endpoint responded with ${response.status}`);
  }

  const result: EvaluationResult = await response.json();
  return { ...result, evaluatedAt: new Date(result.evaluatedAt) };
}
