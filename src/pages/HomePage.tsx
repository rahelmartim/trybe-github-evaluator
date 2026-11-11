import { GithubLogo } from "@phosphor-icons/react";
import { SearchForm } from "../components/SearchForm";
import { ThemeToggle } from "../components/ThemeToggle";

export function HomePage() {
  return (
    <main className="max-w-[1366px] mx-auto flex flex-col items-center">
      <ThemeToggle />
      <GithubLogo
        className="mt-16"
        data-aos="fade-down"
        data-aos-duration="1000"
        color="white"
        size={100}
      />
      <h1 data-aos="fade-down" className="text-white font-black text-6xl mt-8">
        trybe-github-evaluator
      </h1>
      <h2 data-aos="fade-left" className="text-white font-medium italic text-3xl mt-8">
        Descubra a nota do seu perfil:
      </h2>
      <SearchForm />
    </main>
  );
}
