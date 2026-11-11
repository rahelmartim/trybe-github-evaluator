import type { CriterionKey, EvaluationResult } from "../shared/evaluation.js";
import { isDefaultIdenticon } from "./avatar.js";
import type { GitHubClient, GitHubProfile } from "./github.js";
import { findTechnologies } from "./technologies.js";

const AVATAR_PROBE_SIZE = 40;
const EMAIL = /mailto:|[\w.+-]+@[\w-]+\.[\w.-]+/i;
const LINKEDIN = /linkedin\.com\/in\//i;

function hasLinkedin(profile: GitHubProfile, readme: string): boolean {
  return (
    profile.socialAccounts.nodes.some((account) => account.provider === "LINKEDIN") ||
    [profile.websiteUrl, profile.bio, readme].some((text) => LINKEDIN.test(text ?? ""))
  );
}

/** Evaluates a GitHub profile. Returns `null` when the user does not exist. */
export async function evaluateProfile(
  github: GitHubClient,
  username: string,
): Promise<EvaluationResult | null> {
  const profile = await github.getProfile(username);
  if (!profile) return null;

  const [readme, avatar] = await Promise.all([
    github.getProfileReadme(profile.login),
    github.getAvatar(profile.avatarUrl, AVATAR_PROBE_SIZE),
  ]);
  const readmeText = readme ?? "";
  const technologies = findTechnologies(readmeText);
  const publicRepos = profile.repositories.totalCount;
  const pinnedRepos = profile.pinnedItems.totalCount;

  const criteria: Record<CriterionKey, boolean> = {
    hasPhoto: !isDefaultIdenticon(avatar, AVATAR_PROBE_SIZE),
    hasReadme: readme !== null,
    hasEmail: EMAIL.test(readmeText),
    hasLinkedin: hasLinkedin(profile, readmeText),
    hasFiveStacks: technologies.length >= 5,
    hasTenStacks: technologies.length >= 10,
    hasFiveRepos: publicRepos >= 5,
    hasTenRepos: publicRepos >= 10,
    hasTwoPinned: pinnedRepos >= 2,
    hasFourPinned: pinnedRepos >= 4,
  };

  return {
    username: profile.login,
    avatarUrl: profile.avatarUrl,
    grade: Object.values(criteria).filter(Boolean).length * 10,
    criteria,
    details: { technologies, publicRepos, pinnedRepos },
    evaluatedAt: new Date().toISOString(),
  };
}
