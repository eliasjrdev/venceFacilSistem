import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react"; 

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white text-center">
      <div className="flex flex-col items-center max-w-md w-full border-red-600">
        <div className="bg-blue-100 p-4 rounded-full mb-6">
          <ShoppingCart className="w-12 h-12 text-blue-600" />
        </div>

        <h1 className="text-4xl font-extrabold text-blue-800 mb-4">
          VenceFácil
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Controle fácil, rápido e inteligente da validade dos seus produtos de mercearia. Visualize, filtre e mantenha tudo sob controle.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
        >
          Acessar o sistema
        </button>
      </div>

      <footer className="mt-12 text-sm text-gray-500">
        © {new Date().getFullYear()} Desenvolvido por eliasjr.dev 💻
      </footer>
    </div>
  );
}
