import { useTheme } from "../hooks/useTheme";

export function Spinner({ message }: { message: string }) {
  const { darkMode } = useTheme();

  return (
    <div
      role="status"
      data-aos="fade-down"
      data-aos-duration="1500"
      className="flex flex-col items-center"
    >
      <span
        className={`mt-20 h-32 w-32 block rounded-full border-[12px] border-white animate-spin ${
          darkMode ? "border-t-[#A0F046]" : "border-t-[#0376E2]"
        }`}
      />
      <h2 className="text-white font-medium italic text-3xl mt-8">{message}</h2>
    </div>
  );
}
