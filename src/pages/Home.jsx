import { LogOut, User, Camera } from "lucide-react";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { RegisterProducts } from "./RegisterProducts";
import { ProductTable } from "../components/ProductTable";


function Home() {
  const [userEmail, setUserEmail] = useState("");
  const [menu, setMenu] = useState(0)
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao sair do sistema:", error);
    }
  };

  const [profileImage, setProfileImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="justify-center min-h-screen bg-white w-screen">
      <nav className=" font-medium flex flex-row lg:flex-row h-30 w-1/1 justify-between items-center border-b-2 border-blue-dark">
        <div className="text-blue-dark w-72 flex flex-col justify-center items-center">
          <div className="relative group w-20 h-20 mb-2">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Foto de perfil"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-600" />
              </div>
            )}

            <label className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
              <Camera className="text-white w-6 h-6" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <span className="text-sm text-center">{userEmail || "Carregando..."}</span>

        </div>
        <div className="flex w-screen justify-between items-center px-8">
          <button
            onClick={() => setMenu(0)}
            className={`px-4 py-2 rounded font-medium transition ${menu === 0 ? "bg-blue-600 text-white" : "bg-gray-100 text-blue-600 hover:bg-blue-100"
              }`}
          >
            Todos os produtos
          </button>

          <button
            onClick={() => setMenu(1)}
            className={`px-4 py-2 rounded font-medium transition ${menu === 1 ? "bg-blue-600 text-white" : "bg-gray-100 text-blue-600 hover:bg-blue-100"
              }`}
          >
            Próximos de vencer
          </button>

          <button
            onClick={() => setMenu(2)}
            className={`px-4 py-2 rounded font-medium transition ${menu === 2 ? "bg-blue-600 text-white" : "bg-gray-100 text-blue-600 hover:bg-blue-100"
              }`}
          >
            Vencidos
          </button>

          <button
            onClick={() => setMenu(3)}
            className={`px-4 py-2 rounded font-medium transition ${menu === 3 ? "bg-blue-600 text-white" : "bg-gray-100 text-blue-600 hover:bg-blue-100"
              }`}
          >
            Cadastrar novos
          </button>
        </div>
        <div className="w-28 h-24  flex justify-center items-center cursor-pointer"
          onClick={handleLogout}
          title="Sair">
          <LogOut className="w-10 h-10 text-blue-dark hover:text-red-600 transition" />
        </div>
      </nav>   
      <div>
        {menu === 3 && <RegisterProducts />}
        {[0, 1, 2].includes(menu) && <ProductTable filter={menu} />}
      </div>

    </div>
  );
};

export default Home;
