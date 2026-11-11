import { describe, expect, it } from "vitest";
import { findTechnologies } from "./technologies.js";

describe("findTechnologies", () => {
  it("reads skillicons.dev lists", () => {
    const readme = '<img src="https://skillicons.dev/icons?i=js,ts,py,react" />';
    expect(findTechnologies(readme)).toEqual(["JavaScript", "Python", "React", "TypeScript"]);
  });

  it("reads devicon and shields.io icons", () => {
    const readme = [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      "https://img.shields.io/badge/-Postgres-blue?logo=postgresql",
    ].join("\n");
    expect(findTechnologies(readme)).toEqual(["Docker", "PostgreSQL"]);
  });

  it("finds names in plain text and counts each one once", () => {
    const readme = "I write Rust, Python and C#. I love Python and Node.js.";
    expect(findTechnologies(readme)).toEqual(["C#", "Node.js", "Python", "Rust"]);
  });

  it("does not match a name inside another word or a URL", () => {
    const readme = "JavaScript only. See https://example.com/python-guide";
    expect(findTechnologies(readme)).toEqual(["JavaScript"]);
  });
});
