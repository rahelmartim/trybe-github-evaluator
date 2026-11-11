import { useTheme } from "../hooks/useTheme";

const AUTHORS = [
  { name: "rahelmartim", url: "https://github.com/rahelmartim" },
  { name: "felipmartins", url: "https://github.com/felipmartins" },
];

export function Footer() {
  const { darkMode } = useTheme();
  const linkColor = darkMode ? "text-[#A0F046]" : "text-[#0376E2]";

  return (
    <footer
      className={`text-white text-xl flex items-center justify-center h-24 w-full ${
        darkMode ? "bg-[#034422]" : "bg-[#1FC101]"
      }`}
    >
      <p>
        Developed by{" "}
        {AUTHORS.map((author, index) => (
          <span key={author.name}>
            {index > 0 && " and "}
            <a
              className={`font-bold hover:text-[#FCF1CF] ${linkColor}`}
              target="_blank"
              rel="noopener noreferrer"
              href={author.url}
            >
              {author.name}
            </a>
          </span>
        ))}
      </p>
    </footer>
  );
}
