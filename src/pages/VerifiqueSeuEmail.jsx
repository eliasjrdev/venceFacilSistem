import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const VerifiqueSeuEmail = () => {
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const verificarEmail = async () => {
    setMensagem("");
    setLoading(true);

    const user = auth.currentUser;

    try {
      await user.reload(); // 
      if (user.emailVerified) {
        setMensagem("✅ E-mail verificado com sucesso! Redirecionando...");
        setTimeout(() => navigate("/home"), 2000); 
      } else {
        setMensagem("❌ E-mail ainda não verificado. Verifique sua caixa de entrada.");
      }
    } catch (error) {
      setMensagem("❌ Erro ao verificar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-[#004AAD] mb-4">Verifique seu e-mail</h1>
        <p className="mb-6 text-gray-700">
          Enviamos um link de verificação para o e-mail cadastrado. <br />
          Acesse sua caixa de entrada e clique no link para continuar.
        </p>

        <button
          onClick={verificarEmail}
          disabled={loading}
          className={`w-full h-12 text-white font-bold rounded-lg transition ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-[#004AAD] hover:bg-blue-500"
          }`}
        >
          {loading ? "Verificando..." : "Já verifiquei"}
        </button>

        {mensagem && (
          <div className="mt-4 text-sm font-semibold text-center text-gray-800">
            {mensagem}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifiqueSeuEmail;
