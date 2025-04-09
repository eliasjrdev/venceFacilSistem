import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setTimeout(() => navigate("/home"), 100);
    } catch (error) {
      setMessage({ text: "❌ Email ou senha incorretos!", type: "error" });
    }
  };

  return (
    <div className="flex w-screen h-screen flex-col">
      <div className=" h-14 flex w-full items-center p-8 text-blue-dark font-fonteprimary
      text-2xl font-extrabold">
        venceFácil
      </div>
      <div className="h-full flex justify-center items-center">
        <div className="bg-transparent p-8 text-white  rounded-lg shadow-[6px_6px_27px_10px_rgba(0,_0,_0,_0.1)] w-96 h-96 justify-center flex items-center flex-col">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#004AAD]">Faça Login</h2>

          {message && (
            <div
              className={`p-3 text-white font-bold rounded-md mb-4 ${message.type === "success" ? "bg-green-500" : "bg-red-500"
                }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col w-full gap-2">
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className={`flex w-full h-14 pl-3 border border-gray-300 rounded-md bg-blue-dark ${message && "border-2 border-red-500"}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setMessage(null)
              }}
              required
            />
            <input
              type="password"
              placeholder="Digite sua senha"
              className={`w-full h-14 p-3 border border-gray-300 rounded-md bg-blue-dark ${message && "border-2 border-red-500"}`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setMessage(null)
              }}
              required
            />
            <button
              type="submit"
              className="w-full h-14 p-3 rounded-md hover:transition bg-blue-dark hover:bg-blue-400 cursor-pointer"
            >
              Entrar
            </button>
            <p className="text-center mt-4 text-black" >
              Não tem uma conta?{" "}
              <a href="/register" className="text-blue-500 hover:underline">
                Cadastre-se aqui
              </a>
            </p>
          </form>
        </div>
      </div>

    </div>

  );
};

export default Login;
