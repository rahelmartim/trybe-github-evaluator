import { useEffect, useState } from "react";
import { CaretDoubleUp } from "@phosphor-icons/react";
import { useTheme } from "../hooks/useTheme";

export function ScrollToTopButton() {
  const { darkMode } = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Voltar ao topo"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`text-white my-8 animate-bounce ${
        darkMode ? "hover:text-[#A0F046]" : "hover:text-[#034422]"
      }`}
    >
      <CaretDoubleUp size={32} />
    </button>
  );
}
