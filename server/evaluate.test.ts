import { describe, expect, it } from "vitest";
import { evaluateProfile } from "./evaluate.js";
import type { GitHubClient, GitHubProfile } from "./github.js";

const PHOTO = new Uint8Array([0xff, 0xd8, 0xff]);

function fakeClient(profile: GitHubProfile | null, readme: string | null): GitHubClient {
  return {
    getProfile: async () => profile,
    getProfileReadme: async () => readme,
    getAvatar: async () => PHOTO,
  } as unknown as GitHubClient;
}

const profile: GitHubProfile = {
  login: "dev",
  avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
  bio: null,
  websiteUrl: null,
  socialAccounts: { nodes: [{ provider: "LINKEDIN", url: "https://linkedin.com/in/dev" }] },
  repositories: { totalCount: 12 },
  pinnedItems: { totalCount: 4 },
};

describe("evaluateProfile", () => {
  it("returns null when the user does not exist", async () => {
    expect(await evaluateProfile(fakeClient(null, null), "ghost")).toBeNull();
  });

  it("gives 10 points for each passed criterion", async () => {
    const readme =
      "Contact: mailto:dev@example.com\n" +
      "https://skillicons.dev/icons?i=js,ts,py,react,docker,git,html,css,mysql,linux";
    const result = await evaluateProfile(fakeClient(profile, readme), "dev");

    expect(result?.grade).toBe(100);
    expect(Object.values(result!.criteria).every(Boolean)).toBe(true);
  });

  it("fails the README criteria when there is no profile README", async () => {
    const result = await evaluateProfile(
      fakeClient({ ...profile, socialAccounts: { nodes: [] } }, null),
      "dev",
    );

    expect(result?.criteria).toMatchObject({
      hasReadme: false,
      hasEmail: false,
      hasLinkedin: false,
      hasFiveStacks: false,
    });
    expect(result?.grade).toBe(50);
  });
});
