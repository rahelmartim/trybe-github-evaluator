import type { CriterionKey } from "../../shared/evaluation";

interface GradeTier {
  minGrade: number;
  color: string;
  hoverColor: string;
  emoji: string;
}

// Ordered from the highest tier to the lowest.
const TIERS: GradeTier[] = [
  { minGrade: 90, color: "#E76CF2", hoverColor: "#B956C2", emoji: "/emojis/90.svg" },
  { minGrade: 60, color: "#0376E2", hoverColor: "#025EB5", emoji: "/emojis/60.svg" },
  { minGrade: 40, color: "#FDCF36", hoverColor: "#CAA62B", emoji: "/emojis/40.svg" },
  { minGrade: 20, color: "#E22859", hoverColor: "#B52047", emoji: "/emojis/20.svg" },
  { minGrade: 0, color: "#B4B9C0", hoverColor: "#90949A", emoji: "/emojis/0.svg" },
];

export function getGradeTier(grade: number): GradeTier {
  return TIERS.find((tier) => grade >= tier.minGrade) ?? TIERS[TIERS.length - 1];
}

export const CRITERIA: { key: CriterionKey; label: string }[] = [
  { key: "hasPhoto", label: "Tem uma foto de perfil personalizada?" },
  { key: "hasReadme", label: "Tem um README só seu?" },
  { key: "hasEmail", label: "Colocou seu email no README?" },
  { key: "hasLinkedin", label: "Colocou seu LinkedIn no GitHub?" },
  { key: "hasFiveStacks", label: "Tem 5 ou mais tecnologias no seu README?" },
  { key: "hasTenStacks", label: "Tem 10 ou mais tecnologias no seu README?" },
  { key: "hasFiveRepos", label: "Tem 5 ou mais repositórios públicos no seu GitHub?" },
  { key: "hasTenRepos", label: "Tem 10 ou mais repositórios públicos no seu GitHub?" },
  { key: "hasTwoPinned", label: "Tem no mínimo 2 repositórios fixados no seu perfil?" },
  { key: "hasFourPinned", label: "Tem 4 ou mais repositórios fixados no seu perfil?" },
];
