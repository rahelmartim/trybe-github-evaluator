import { Coffee } from "@phosphor-icons/react";

export function TeaPage() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <Coffee data-aos="fade-right" data-aos-duration="1500" size={160} color="white" />
      <h1 data-aos="fade-left" data-aos-duration="1500" className="text-7xl text-white">
        Sim, eu gosto de chá e você?
      </h1>
    </main>
  );
}
