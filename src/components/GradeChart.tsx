import { ArcElement, Chart as ChartJS } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getGradeTier } from "../lib/grade";

ChartJS.register(ArcElement);

interface GradeChartProps {
  grade: number;
  avatarUrl: string;
  username: string;
}

export function GradeChart({ grade, avatarUrl, username }: GradeChartProps) {
  const tier = getGradeTier(grade);

  const data = {
    datasets: [
      {
        data: [100 - grade, grade],
        backgroundColor: ["white", tier.color],
        hoverBackgroundColor: ["white", tier.hoverColor],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="w-72 h-72 mt-20 relative">
      <Doughnut data={data} options={{ responsive: true, maintainAspectRatio: true }} />
      <img
        className="rounded-full w-60 h-60 absolute top-[24px] left-[24px]"
        src={avatarUrl}
        alt={`Foto de perfil de ${username}`}
      />
      <img
        data-aos="fade-up"
        data-aos-duration="1000"
        src={tier.emoji}
        alt=""
        className="w-20 h-20 absolute top-[210px] right-[5px]"
      />
    </div>
  );
}
