import { Check, X } from "@phosphor-icons/react";

interface CriterionItemProps {
  label: string;
  passed: boolean;
}

export function CriterionItem({ label, passed }: CriterionItemProps) {
  return (
    <li
      data-aos="fade-up"
      data-aos-delay="50"
      data-aos-duration="1000"
      className="flex items-center gap-3"
    >
      {passed ? (
        <span className="bg-[#B7EECE] rounded-full w-12 h-12 flex items-center justify-center">
          <Check className="text-[#219653]" size={40} aria-label="Sim" />
        </span>
      ) : (
        <span className="bg-[#EEB7B7] rounded-full w-12 h-12 flex items-center justify-center">
          <X className="text-[#EB5757]" size={35} aria-label="Não" />
        </span>
      )}
      <h2 className="text-white font-medium text-2xl max-w-xl pt-1">{label}</h2>
    </li>
  );
}
