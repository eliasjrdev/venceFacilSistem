import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

const EsqueciSenha = () => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const [modalMessage, setModalMessage] = useState(""); // conteúdo da mensagem
    const [modalTitle, setModalTitle] = useState("");     // título da modal
    const [opened, { open, close }] = useDisclosure(false); // controle do modal
    const isMobile = useMediaQuery('(max-width: 50em)');     // fullscreen no mobile

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            await sendPasswordResetEmail(auth, email);
            setEmail("");
            setModalTitle("📧 Verifique seu e-mail");
            setModalMessage("Se o e-mail informado estiver cadastrado, você receberá um link para redefinir sua senha.");
            open();

        } catch (error) {
            console.error("Erro:", error);
            setModalTitle("❌ Erro ao enviar e-mail");
            setModalMessage("Ocorreu um erro. Verifique o e-mail digitado ou tente mais tarde.");
            open();

        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title={modalTitle}
                fullScreen={isMobile}
                centered
                transitionProps={{ transition: "fade", duration: 200 }}
            >
                <div className="text-gray-800 text-base">{modalMessage}</div>
                <div className="mt-4 text-right">
                    <Button onClick={close}>OK</Button>
                </div>
            </Modal>
            <div className="flex h-screen items-center justify-center bg-gray-100 px-4">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-bold text-[#004AAD] text-center mb-4">
                        Redefinir Senha
                    </h1>
                    <p className="text-gray-700 text-center mb-6">
                        Informe o e-mail usado na sua conta. Você receberá um link para criar uma nova senha.
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 h-12 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className={`rounded-lg h-12 font-bold text-white transition ${loading
                                ? "bg-blue-300 cursor-not-allowed"
                                : "bg-[#004AAD] hover:bg-blue-500 cursor-pointer"
                                }`}
                        >
                            {loading ? "Enviando..." : "Enviar link de redefinição"}
                        </button>
                    </form>
                    <p className="text-center mt-6 text-sm">
                        Lembrou da senha?{" "}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Voltar para login
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default EsqueciSenha;