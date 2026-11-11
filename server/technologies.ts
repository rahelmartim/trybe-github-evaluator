interface Technology {
  name: string;
  /** Icon identifiers used by skillicons.dev, devicon and shields.io. */
  ids: string[];
  /** Words that name the technology in plain text. Omit for ambiguous names. */
  words?: string[];
}

const TECHNOLOGIES: Technology[] = [
  { name: "JavaScript", ids: ["js", "javascript"], words: ["javascript"] },
  { name: "TypeScript", ids: ["ts", "typescript"], words: ["typescript"] },
  { name: "Python", ids: ["py", "python"], words: ["python"] },
  { name: "Java", ids: ["java", "openjdk"], words: ["java"] },
  { name: "Kotlin", ids: ["kotlin"], words: ["kotlin"] },
  { name: "Swift", ids: ["swift"], words: ["swift"] },
  { name: "C", ids: ["c"] },
  { name: "C++", ids: ["cpp", "cplusplus", "c++"], words: ["c\\+\\+"] },
  { name: "C#", ids: ["cs", "csharp", "c#"], words: ["c#"] },
  { name: "Go", ids: ["go", "golang"], words: ["golang"] },
  { name: "Rust", ids: ["rust"], words: ["rust"] },
  { name: "Ruby", ids: ["ruby"], words: ["ruby"] },
  { name: "PHP", ids: ["php"], words: ["php"] },
  { name: "Elixir", ids: ["elixir"], words: ["elixir"] },
  { name: "Clojure", ids: ["clojure"], words: ["clojure"] },
  { name: "Scala", ids: ["scala"], words: ["scala"] },
  { name: "Dart", ids: ["dart"], words: ["dart"] },
  { name: "Lua", ids: ["lua"], words: ["lua"] },
  { name: "R", ids: ["r"] },
  { name: "Bash", ids: ["bash", "gnubash", "shell"], words: ["bash", "shell script"] },
  { name: "HTML", ids: ["html", "html5"], words: ["html", "html5"] },
  { name: "CSS", ids: ["css", "css3"], words: ["css", "css3"] },
  { name: "Sass", ids: ["sass", "scss"], words: ["sass", "scss"] },
  { name: "Tailwind CSS", ids: ["tailwind", "tailwindcss"], words: ["tailwind", "tailwindcss"] },
  { name: "Bootstrap", ids: ["bootstrap"], words: ["bootstrap"] },
  { name: "React", ids: ["react", "reactjs"], words: ["react", "reactjs", "react\\.js"] },
  { name: "React Native", ids: ["reactnative"], words: ["react native"] },
  { name: "Next.js", ids: ["next", "nextjs", "nextdotjs"], words: ["next\\.js", "nextjs"] },
  { name: "Vue", ids: ["vue", "vuejs", "vuedotjs"], words: ["vue", "vuejs", "vue\\.js"] },
  { name: "Angular", ids: ["angular", "angularjs"], words: ["angular"] },
  { name: "Svelte", ids: ["svelte"], words: ["svelte"] },
  { name: "Redux", ids: ["redux"], words: ["redux"] },
  { name: "Vite", ids: ["vite", "vitejs"], words: ["vite"] },
  { name: "Webpack", ids: ["webpack"], words: ["webpack"] },
  { name: "Node.js", ids: ["node", "nodejs", "nodedotjs"], words: ["node\\.js", "nodejs"] },
  { name: "Deno", ids: ["deno"], words: ["deno"] },
  { name: "Express", ids: ["express", "expressjs"], words: ["express\\.js", "expressjs"] },
  { name: "NestJS", ids: ["nest", "nestjs"], words: ["nestjs"] },
  { name: "Django", ids: ["django"], words: ["django"] },
  { name: "Flask", ids: ["flask"], words: ["flask"] },
  { name: "FastAPI", ids: ["fastapi"], words: ["fastapi"] },
  { name: "Spring", ids: ["spring", "springboot"], words: ["spring boot"] },
  { name: "Laravel", ids: ["laravel"], words: ["laravel"] },
  { name: "Rails", ids: ["rails", "rubyonrails"], words: ["ruby on rails"] },
  { name: ".NET", ids: ["dotnet", "net"], words: ["\\.net"] },
  { name: "GraphQL", ids: ["graphql"], words: ["graphql"] },
  { name: "Jest", ids: ["jest"], words: ["jest"] },
  { name: "Cypress", ids: ["cypress"], words: ["cypress"] },
  { name: "Selenium", ids: ["selenium"], words: ["selenium"] },
  { name: "Pytest", ids: ["pytest"], words: ["pytest"] },
  { name: "MySQL", ids: ["mysql"], words: ["mysql"] },
  { name: "PostgreSQL", ids: ["postgres", "postgresql"], words: ["postgres", "postgresql"] },
  { name: "SQLite", ids: ["sqlite"], words: ["sqlite"] },
  { name: "MongoDB", ids: ["mongo", "mongodb"], words: ["mongodb"] },
  { name: "Redis", ids: ["redis"], words: ["redis"] },
  { name: "Firebase", ids: ["firebase"], words: ["firebase"] },
  { name: "Docker", ids: ["docker"], words: ["docker"] },
  { name: "Kubernetes", ids: ["kubernetes", "k8s"], words: ["kubernetes"] },
  { name: "AWS", ids: ["aws", "amazonaws", "amazonwebservices"], words: ["aws"] },
  { name: "Google Cloud", ids: ["gcp", "googlecloud"], words: ["google cloud"] },
  { name: "Azure", ids: ["azure", "microsoftazure"], words: ["azure"] },
  { name: "Heroku", ids: ["heroku"], words: ["heroku"] },
  { name: "Vercel", ids: ["vercel"], words: ["vercel"] },
  { name: "Nginx", ids: ["nginx"], words: ["nginx"] },
  { name: "Linux", ids: ["linux"], words: ["linux"] },
  { name: "Git", ids: ["git"], words: ["git"] },
  { name: "Figma", ids: ["figma"], words: ["figma"] },
  { name: "Pandas", ids: ["pandas"], words: ["pandas"] },
  { name: "NumPy", ids: ["numpy"], words: ["numpy"] },
  { name: "TensorFlow", ids: ["tensorflow"], words: ["tensorflow"] },
  { name: "PyTorch", ids: ["pytorch"], words: ["pytorch"] },
  { name: "Flutter", ids: ["flutter"], words: ["flutter"] },
];

const BY_ID = new Map(
  TECHNOLOGIES.flatMap((tech) => tech.ids.map((id) => [id, tech.name] as const)),
);

const WORD_PATTERNS = TECHNOLOGIES.filter((tech) => tech.words).map((tech) => ({
  name: tech.name,
  pattern: new RegExp(`(?<![\\w.#+-])(?:${tech.words!.join("|")})(?![\\w#+])`, "i"),
}));

/** Collects icon identifiers from skillicons.dev, devicon and shields.io URLs. */
function iconIds(readme: string): string[] {
  const ids: string[] = [];
  for (const match of readme.matchAll(/skillicons\.dev\/icons\?i=([\w,+#.-]+)/gi)) {
    ids.push(...match[1].split(","));
  }
  for (const match of readme.matchAll(/devicons?\/(?:devicon\/[^"'\s)]*?)?icons\/([\w+#.-]+)\//gi)) {
    ids.push(match[1]);
  }
  for (const match of readme.matchAll(/[?&]logo=([\w+#.-]+)/gi)) {
    ids.push(match[1]);
  }
  return ids.map((id) => id.toLowerCase());
}

/** Returns the distinct technologies that a profile README mentions. */
export function findTechnologies(readme: string): string[] {
  const found = new Set<string>();

  for (const id of iconIds(readme)) {
    const name = BY_ID.get(id);
    if (name) found.add(name);
  }

  // Plain text only, so that words inside URLs do not count.
  const text = readme.replace(/\bhttps?:\/\/\S+/gi, " ");
  for (const { name, pattern } of WORD_PATTERNS) {
    if (pattern.test(text)) found.add(name);
  }

  return [...found].sort();
}
