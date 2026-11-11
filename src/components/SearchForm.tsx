import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { isValidUsername } from "../api/evaluator";

export function SearchForm() {
  const navigate = useNavigate();
  const [invalid, setInvalid] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("github_user") ?? "")
      .trim()
      .replace(/^@/, "");

    if (!isValidUsername(username)) {
      setInvalid(true);
      return;
    }
    navigate(`/evaluation/${encodeURIComponent(username)}`);
  }

  return (
    <form
      data-aos="fade-right"
      data-aos-duration="1000"
      className="mt-32"
      onSubmit={handleSubmit}
    >
      <div className="relative items-center flex group">
        <input
          className="rounded-full w-[580px] h-20 bg-white text-2xl text-[#0B5A47] pl-9 peer outline-none"
          required
          name="github_user"
          id="github_user"
          type="text"
          autoComplete="off"
          maxLength={39}
          onChange={() => setInvalid(false)}
        />
        <label
          htmlFor="github_user"
          className="transform transition-transform absolute top-0 left-0 h-full flex items-center
            text-opacity-40 text-2xl text-black pl-9
            group-focus-within:text-white group-focus-within:h-1/2 group-focus-within:-translate-y-full group-focus-within:pl-6
            peer-valid:h-1/2 peer-valid:-translate-y-full peer-valid:pl-6"
        >
          Digite o usuário do seu GitHub:
        </label>
        <button
          type="submit"
          aria-label="Avaliar perfil"
          data-aos="fade-left"
          className="w-32 h-32 bg-[#1DB702] rounded-full absolute left-[463px] border-white border-8
            flex justify-center items-center hover:bg-[#0B5A47] hover:border-[10px]"
        >
          <MagnifyingGlass color="white" size={60} />
        </button>
      </div>
      {invalid && (
        <p role="alert" className="text-white text-xl mt-6 pl-9">
          Nome de usuário do GitHub inválido.
        </p>
      )}
    </form>
  );
}
