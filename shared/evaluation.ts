/** Contract between the evaluation endpoint and the front end. */

export const CRITERION_KEYS = [
  "hasPhoto",
  "hasReadme",
  "hasEmail",
  "hasLinkedin",
  "hasFiveStacks",
  "hasTenStacks",
  "hasFiveRepos",
  "hasTenRepos",
  "hasTwoPinned",
  "hasFourPinned",
] as const;

export type CriterionKey = (typeof CRITERION_KEYS)[number];

export interface EvaluationResult {
  username: string;
  avatarUrl: string;
  /** Grade from 0 to 100. Each passed criterion adds 10 points. */
  grade: number;
  criteria: Record<CriterionKey, boolean>;
  details: {
    technologies: string[];
    publicRepos: number;
    pinnedRepos: number;
  };
  /** ISO 8601 timestamp. */
  evaluatedAt: string;
}

// GitHub usernames: alphanumeric or single hyphens, up to 39 characters.
const GITHUB_USERNAME = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

export function isValidUsername(username: string): boolean {
  return GITHUB_USERNAME.test(username);
}
