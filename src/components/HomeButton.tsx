import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "../hooks/useTheme";

interface HomeButtonProps {
  icon: ReactNode;
  children: ReactNode;
}

export function HomeButton({ icon, children }: HomeButtonProps) {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  return (
    <button
      type="button"
      data-aos="fade-up"
      className={`mt-12 px-8 h-16 flex items-center justify-center gap-3 rounded-2xl border-[3px] border-white
        text-white font-medium text-2xl ${
          darkMode ? "hover:bg-[#1DB702]" : "hover:bg-[#0B5A47]"
        }`}
      onClick={() => navigate("/")}
    >
      {icon}
      <span className="pt-1">{children}</span>
    </button>
  );
}
