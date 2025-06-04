
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRoute from "./pages/PrivateRoute";
import { LandingPage } from "./pages/LandingPage";
import VerifiqueSeuEmail from "./pages/VerifiqueSeuEmail";
import EsqueciSenha from './pages/EsqueciSenha';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verifique-seu-email" element={<VerifiqueSeuEmail />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

