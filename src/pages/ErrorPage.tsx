import { ArrowUUpLeft, SealWarning } from "@phosphor-icons/react";
import { HomeButton } from "../components/HomeButton";

export function ErrorPage() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <SealWarning data-aos="fade-down" data-aos-duration="200" size={160} color="white" />
      <h1
        data-aos="fade-left"
        data-aos-duration="350"
        className="text-7xl text-white max-w-4xl text-center mt-12"
      >
        Ops, parece que algo deu errado!
      </h1>
      <HomeButton icon={<ArrowUUpLeft size={22} />}>Voltar ao início</HomeButton>
    </main>
  );
}
