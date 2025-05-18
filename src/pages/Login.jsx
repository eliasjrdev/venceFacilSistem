import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setTimeout(() => navigate("/home"), 100);
    } catch (error) {
      setMessage({ text: "❌ Email ou senha incorretos!", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-screen h-screen flex-col">
      <div className=" h-14 flex w-full items-center p-8 text-[#004AAD] font-fonteprimary
      text-2xl font-extrabold">
        venceFácil
      </div>
      <div className=" h-full flex justify-center items-center">
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

          <form onSubmit={handleLogin} className="relative  flex flex-col w-full gap-2">
            <div>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className={`flex w-full h-14 pl-3 border border-gray-300 rounded-md bg-[#004AAD] ${message && "border-2 border-red-500"}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                className={`w-full h-14 p-3 border pr-12 border-gray-300 rounded-md bg-[#004AAD] ${message && "border-2 border-red-500"}`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setMessage(null)
                }}

                required

              />

              <div
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-white hover:text-blue-600 transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </div>
            </div>



            <button
              type="submit"
              disabled={loading}
              className={`cursor-pointer w-full h-14 p-3 rounded-md font-semibold transition ${loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-[#004AAD] hover:bg-blue-400"
                }`}
            >
              {loading ? (
                <div className="flex justify-center items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="white"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    />
                  </svg>
                  Entrando...
                </div>
              ) : (
                "Entrar"
              )}
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
