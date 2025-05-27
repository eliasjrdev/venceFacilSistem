import { useNavigate } from "react-router-dom";
import imagemlp from "../assets/imagemlp.svg";
export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-white h-screen w-full items-center justify-center flex flex-col bg-gradient-to-tr from-blue-500 via-blue-600 to-indigo-700 text-center ">
        <header className="p-5 w-screen flex justify-between">
          <span className="pl-7 font-[Boldonse]">VenceFacil</span>
          <nav className="w-80 pr-10 flex justify-between">
            <a href="#sobre"
              className="relative font-[Atkinson_Hyperlegible_Next] text-xl font-[700] 
          after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 
        after:bg-white after:transition-all after:duration-300 
          hover:after:w-full">Sobre nós</a>

            <a href="#"
              className="relative font-[Atkinson_Hyperlegible_Next] text-xl font-[700] 
          after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 
        after:bg-white after:transition-all after:duration-300 
          hover:after:w-full">Fale conosco</a>
          </nav>
        </header>
        <div className="flex h-full w-4/5 justify-between font-[Open_Sans] items-center">
          <div className="flex flex-col justify-center">
            <h1 className="font-[Boldonse] text-start text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Reduza <br /> suas perdas</h1>
            <h2 className="pt-6 pb-3 text-base md:text-lg lg:text-xl font-[Atkinson_Hyperlegible_Next] text-start">O venceFacil é controle total da validade
              dos seus produtos.
            </h2>
            <button
              onClick={() => navigate("/login")}
              className="text-xl font-[700] relative flex h-[50px] w-60 items-center justify-center overflow-hidden bg-white font-[Atkinson_Hyperlegible_Next]
          text-blue-600 shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:border-0
          before:border-blue-700 before:duration-100 before:ease-linear hover:bg-blue-600 hover:text-white
          hover:shadow-blue-600 hover:before:border-[25px] cursor-pointer rounded-lg"
            >
              <span className="relative z-10">Acesse o sistema</span>
            </button>
          </div>
          <div className="flex flex-col items-center max-w-md w-full">
            <img src={imagemlp} alt="Ilustração" />
          </div>
        </div>
      </div>
      <div id="sobre" className="w-full h-[350px]  flex flex-col items-center ">
        <h2 className="font-[Boldonse] p-5 text-blue-600">Sobre nós</h2>
        <div className="p-5 w-1/2 bg-gradient-to-tr from-blue-500 via-blue-600 to-indigo-700
        shadow-[3px_0px_16px_-4px_rgba(0,_0,_0,_0.6)] rounded-xl text-white">
          <p>
            O VenceFácil é uma ferramenta criada para ajudar pequenos comerciantes,
            mercadinhos e empreendedores a manterem o controle total da validade dos seus produtos de forma simples,
            rápida e eficiente.
            Nosso objetivo é acabar com a perda de mercadorias por vencimento, trazendo mais organização,
            economia e praticidade para o seu dia a dia. Com o VenceFácil,
            você cadastra seus produtos, acompanha as datas de validade, visualiza rapidamente quais estão
            próximos de vencer e quais já estão vencidos, tudo em uma interface simples,
            intuitiva e acessível de qualquer lugar.<br />
            Controle de validade nunca foi tão fácil!
          </p>
        </div>
      </div>

      <div className="w-full px-10 py-20 bg-gradient-to-tr from-blue-500 via-blue-600 to-indigo-700 text-white flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-6">Fale conosco</h2>
        <p className="mb-10 text-center max-w-2xl">
          Tem alguma dúvida, sugestão ou quer falar conosco? Preencha o formulário abaixo e responderemos o mais rápido possível!
        </p>

        <form className="w-full max-w-xl space-y-6">
          <div>
            <label className="block mb-2 text-lg font-medium">Nome</label>
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full rounded-lg border border-white bg-white/90 text-black p-3 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-lg font-medium">E-mail</label>
            <input
              type="email"
              placeholder="seuemail@exemplo.com"
              className="w-full rounded-lg border border-white bg-white/90 text-black p-3 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-lg font-medium">Mensagem</label>
            <textarea
              rows="5"
              placeholder="Escreva sua mensagem..."
              className="w-full rounded-lg border border-white bg-white/90 text-black p-3 focus:outline-none focus:ring-2 focus:ring-white"
            ></textarea>
          </div>

          <button
            type="submit"
            className="text-xl font-[700] relative flex h-[50px] w-full items-center justify-center overflow-hidden bg-white font-[Atkinson_Hyperlegible_Next]
          text-blue-600 shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:border-0
          before:border-blue-700 before:duration-100 before:ease-linear hover:bg-blue-600 hover:text-white
          hover:shadow-blue-600 hover:before:border-[25px] cursor-pointer rounded-lg"
          >
            <span className="relative z-10">Enviar mensagem</span>
          </button>
        </form>
      </div>
    </div>
  );
}
