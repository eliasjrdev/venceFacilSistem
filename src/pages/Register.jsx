import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getFriendlyErrorMessage = (errorCode) => {
    const errorMessages = {
      "auth/email-already-in-use": "❌ Este e-mail já está cadastrado. ❌ ",
      "auth/invalid-email": "❌ O e-mail informado não é válido.",
      "auth/weak-password": "❌ A senha precisa ter pelo menos 6 caracteres.",
      "auth/missing-password": "❌ Você precisa informar uma senha.",
      "auth/network-request-failed": "❌ Falha na conexão. Verifique sua internet.",
      "auth/operation-not-allowed": "❌ O cadastro de usuários está desativado.",
      "auth/too-many-requests": "❌ Muitas tentativas. Aguarde um pouco e tente novamente.",
      default: "❌ Ocorreu um erro inesperado. Tente novamente.",
    };

    return errorMessages[errorCode] || errorMessages.default;
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/home");

      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage({
        text: getFriendlyErrorMessage(error.code),
        type: "error",
      });
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
      <div className="h-full flex justify-center items-center">

        <div className="bg-white p-8 rounded-lg shadow-[6px_6px_27px_10px_rgba(0,_0,_0,_0.1)] w-96 h-96 flex flex-col justify-center items-center" >
          <h2 className="text-2xl font-bold text-center text-[#004AAD] mb-6 " >
            Criar Conta
          </h2>

          <form onSubmit={handleRegister} className="flex flex-col gap-2 w-full text-white ">
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" bg-[#004AAD] h-14 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Crie uma senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#004AAD] h-14 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <div
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500 hover:text-blue-600 transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`rounded-lg h-14 text-white px-6 font-semibold transition ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-[#004AAD] hover:bg-blue-400 cursor-pointer"
                }`}
            >
              {loading ?
                (
                  <div className="flex justify-center items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                    </svg>
                    Cadastrando...
                  </div>
                ) : (
                  "Cadastrar"
                )}
            </button>

          </form>

          {message && (
            <div
              className={`p-2 mt-2 text-white font-bold rounded-md ${message.type === "success" ? "bg-green-500" : "bg-red-500"
                }`}>
              {message.text}
            </div>
          )}

          <p className="text-center mt-4">
            Já tem uma conta?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Faça login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;