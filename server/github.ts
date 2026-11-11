const GITHUB_API = "https://api.github.com";
const AVATAR_HOST = "avatars.githubusercontent.com";

export interface GitHubProfile {
  login: string;
  avatarUrl: string;
  bio: string | null;
  websiteUrl: string | null;
  socialAccounts: { nodes: { provider: string; url: string }[] };
  repositories: { totalCount: number };
  pinnedItems: { totalCount: number };
}

const PROFILE_QUERY = `
  query Profile($login: String!) {
    user(login: $login) {
      login
      avatarUrl
      bio
      websiteUrl
      socialAccounts(first: 20) { nodes { provider url } }
      repositories(privacy: PUBLIC, ownerAffiliations: OWNER, isFork: false) { totalCount }
      pinnedItems(first: 6, types: REPOSITORY) { totalCount }
    }
  }
`;

export class GitHubClient {
  constructor(
    private readonly token: string,
    private readonly fetchImpl: typeof fetch = fetch,
  ) {}

  private headers(accept = "application/vnd.github+json"): Record<string, string> {
    return {
      Accept: accept,
      Authorization: `Bearer ${this.token}`,
      "User-Agent": "trybe-github-evaluator",
      "X-GitHub-Api-Version": "2022-11-28",
    };
  }

  /** Returns `null` when the user does not exist. */
  async getProfile(login: string): Promise<GitHubProfile | null> {
    const response = await this.fetchImpl(`${GITHUB_API}/graphql`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify({ query: PROFILE_QUERY, variables: { login } }),
    });
    if (!response.ok) {
      throw new Error(`GitHub GraphQL API responded with ${response.status}`);
    }

    const body = (await response.json()) as {
      data?: { user: GitHubProfile | null };
      errors?: { type?: string; message: string }[];
    };
    const errors = body.errors?.filter((error) => error.type !== "NOT_FOUND") ?? [];
    if (errors.length > 0) {
      throw new Error(`GitHub GraphQL API error: ${errors[0].message}`);
    }
    return body.data?.user ?? null;
  }

  /** Returns the profile README (the `<login>/<login>` repository), or `null`. */
  async getProfileReadme(login: string): Promise<string | null> {
    const response = await this.fetchImpl(
      `${GITHUB_API}/repos/${login}/${login}/readme`,
      { headers: this.headers("application/vnd.github.raw") },
    );
    if (response.status === 404) return null;
    if (!response.ok) {
      throw new Error(`GitHub REST API responded with ${response.status}`);
    }
    return response.text();
  }

  async getAvatar(avatarUrl: string, size: number): Promise<Uint8Array> {
    const url = new URL(avatarUrl);
    if (url.protocol !== "https:" || url.hostname !== AVATAR_HOST) {
      throw new Error(`Unexpected avatar host: ${url.hostname}`);
    }
    url.searchParams.set("s", String(size));
    const response = await this.fetchImpl(url);
    if (!response.ok) {
      throw new Error(`GitHub avatar responded with ${response.status}`);
    }
    return new Uint8Array(await response.arrayBuffer());
  }
}
