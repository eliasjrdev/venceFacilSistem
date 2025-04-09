import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe(); // limpa o listener quando o componente desmontar
  }, []);

  if (loading) return <p className="text-center mt-20">Carregando...</p>;

  return authenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
