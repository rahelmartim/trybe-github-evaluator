import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowCounterClockwise, CaretDoubleDown } from "@phosphor-icons/react";
import { fetchEvaluation, UserNotFoundError, type Evaluation } from "../api/evaluator";
import { CriterionItem } from "../components/CriterionItem";
import { Footer } from "../components/Footer";
import { GradeChart } from "../components/GradeChart";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { Spinner } from "../components/Spinner";
import { ThemeToggle } from "../components/ThemeToggle";
import { useTheme } from "../hooks/useTheme";
import { CRITERIA } from "../lib/grade";
import { ErrorPage } from "./ErrorPage";
import { UserNotFoundPage } from "./UserNotFoundPage";

type State =
  | { status: "loading" }
  | { status: "success"; evaluation: Evaluation }
  | { status: "not-found" }
  | { status: "error" };

export function EvaluationPage() {
  const { username = "" } = useParams();
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading" });

    fetchEvaluation(username, controller.signal)
      .then((evaluation) => setState({ status: "success", evaluation }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setState({
          status: error instanceof UserNotFoundError ? "not-found" : "error",
        });
      });

    return () => controller.abort();
  }, [username]);

  switch (state.status) {
    case "loading":
      return (
        <main className="flex flex-col items-center">
          <ThemeToggle />
          <Spinner message="Calculando sua nota..." />
        </main>
      );
    case "not-found":
      return <UserNotFoundPage username={username} />;
    case "error":
      return <ErrorPage />;
    case "success":
      return <EvaluationResult evaluation={state.evaluation} />;
  }
}

function EvaluationResult({ evaluation }: { evaluation: Evaluation }) {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const accent = darkMode ? "text-[#034422]" : "text-[#1DB702]";

  return (
    <div className="flex flex-col items-center scrollbar-hide">
      <ThemeToggle />

      <section className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-white font-bold text-6xl">
          Seu perfil é nota:{" "}
          <span data-aos="fade-down" data-aos-duration="1000">
            {evaluation.grade / 10}
          </span>
        </h1>
        <GradeChart
          grade={evaluation.grade}
          avatarUrl={evaluation.avatarUrl}
          username={evaluation.username}
        />
        <h2 className="text-white font-bold text-4xl mt-12">{evaluation.username}</h2>
        <CaretDoubleDown
          data-aos="fade-down"
          data-aos-duration="1000"
          className="text-white mt-24 animate-bounce"
          size={96}
        />
      </section>

      <ul className="flex flex-col items-start gap-14 mt-14">
        {CRITERIA.map(({ key, label }) => (
          <CriterionItem key={key} label={label} passed={evaluation.criteria[key]} />
        ))}
      </ul>

      <button
        type="button"
        data-aos="fade-up"
        className={`mt-14 bg-white w-56 h-14 flex items-center justify-center gap-2 group rounded-2xl ${
          darkMode ? "hover:bg-[#1DB702]" : "hover:bg-[#034422]"
        }`}
        onClick={() => navigate("/")}
      >
        <ArrowCounterClockwise size={22} className={`${accent} group-hover:text-white`} />
        <span className={`${accent} group-hover:text-white font-semibold text-base pt-1`}>
          Fazer novo teste
        </span>
      </button>

      <p data-aos="fade-up" className="font-bold text-white text-xl max-w-[250px] text-center mt-16">
        Avaliação realizada em: {evaluation.evaluatedAt.toLocaleDateString("pt-BR")}
      </p>

      <ScrollToTopButton />
      <Footer />
    </div>
  );
}
