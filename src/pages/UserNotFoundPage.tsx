import { Alien, FlyingSaucer } from "@phosphor-icons/react";
import { HomeButton } from "../components/HomeButton";
import { useTheme } from "../hooks/useTheme";

export function UserNotFoundPage({ username }: { username: string }) {
  const { darkMode } = useTheme();
  const accent = darkMode ? "#A0F046" : "#E22859";

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 data-aos="fade-down" className="text-white font-bold text-6xl">
        Seu perfil é nota:{" "}
        <span className="font-black" style={{ color: accent }}>
          404
        </span>
      </h1>
      <div
        data-aos="fade"
        data-aos-duration="1000"
        className="w-72 h-72 rounded-full border-white border-[12px] mt-14 border-dashed flex items-center justify-center"
      >
        <Alien data-aos="flip-up" data-aos-duration="1000" color={accent} size={150} />
      </div>
      <h2 data-aos="fade-up" className="text-white font-semibold text-3xl mt-14">
        {username}
      </h2>
      <HomeButton icon={<FlyingSaucer color={accent} size={40} />}>
        Voltar para casa
      </HomeButton>
    </main>
  );
}
