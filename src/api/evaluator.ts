const API_URL =
  import.meta.env.VITE_EVALUATOR_API_URL ??
  "https://github-profile-evaluator.betrybe.dev";

// GitHub usernames: alphanumeric or single hyphens, up to 39 characters.
const GITHUB_USERNAME = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

export function isValidUsername(username: string): boolean {
  return GITHUB_USERNAME.test(username);
}

/** Raw payload returned by `GET /evaluation/{user}`. */
interface EvaluationResponse {
  github_username: string;
  github?: string | null;
  photo_url: string;
  photo: boolean;
  readme: string | null;
  has_readme?: boolean;
  email: boolean;
  linkedin: boolean;
  has_five_tags: boolean;
  has_ten_tags: boolean;
  has_five_repos: boolean;
  has_ten_repos: boolean;
  has_two_pinned: boolean;
  has_four_pinned: boolean;
  grade: number;
}

export interface Evaluation {
  username: string;
  avatarUrl: string;
  /** Grade from 0 to 100. */
  grade: number;
  criteria: {
    hasPhoto: boolean;
    hasReadme: boolean;
    hasEmail: boolean;
    hasLinkedin: boolean;
    hasFiveStacks: boolean;
    hasTenStacks: boolean;
    hasFiveRepos: boolean;
    hasTenRepos: boolean;
    hasTwoPinned: boolean;
    hasFourPinned: boolean;
  };
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
    `${API_URL}/evaluation/${encodeURIComponent(username)}`,
    { signal },
  );
  if (!response.ok) {
    throw new Error(`Evaluator API responded with ${response.status}`);
  }

  const data: EvaluationResponse = await response.json();
  // The API answers 200 with `github: null` when the profile does not exist.
  if (data.github === null) throw new UserNotFoundError(username);

  return {
    username: data.github_username,
    avatarUrl: data.photo_url,
    grade: data.grade,
    criteria: {
      hasPhoto: data.photo,
      hasReadme: data.has_readme ?? Boolean(data.readme),
      hasEmail: data.email,
      hasLinkedin: data.linkedin,
      hasFiveStacks: data.has_five_tags,
      hasTenStacks: data.has_ten_tags,
      hasFiveRepos: data.has_five_repos,
      hasTenRepos: data.has_ten_repos,
      hasTwoPinned: data.has_two_pinned,
      hasFourPinned: data.has_four_pinned,
    },
    evaluatedAt: new Date(),
  };
}
