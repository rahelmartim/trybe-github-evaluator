import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "../hooks/useTheme";

export function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      type="button"
      aria-label={darkMode ? "Ativar tema claro" : "Ativar tema escuro"}
      className={`self-end mr-12 mt-12 text-[50px] ${
        darkMode
          ? "text-[#1DB702] hover:text-[#A0F046]"
          : "text-[#A0F046] hover:text-[#034422]"
      }`}
      onClick={toggleDarkMode}
    >
      {darkMode ? <Moon /> : <Sun />}
    </button>
  );
}
