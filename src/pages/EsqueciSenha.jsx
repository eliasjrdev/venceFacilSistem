import { useState, useRef } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useModals } from '@mantine/modals';

const EsqueciSenha = () => {
    const modals = useModals();
    const [email, setEmail] = useState("")
    const [mensagem, setMensagem] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem("")
        setLoading(true)

        try {
            await sendPasswordResetEmail(auth, email);
            setEmail("");

            modals.openConfirmModal({
                title: '📧 Verifique seu e-mail',
                children: (
                    <p>Se o e-mail informado estiver cadastrado, você receberá um link para redefinir sua senha.</p>
                ),
                labels: { confirm: 'OK' },
                onConfirm: () => { },
                centered: true,
            });

        } catch (error) {
            console.error("Erro:", error);

            modals.openConfirmModal({
                title: '❌ Erro ao enviar e-mail',
                children: (
                    <p>Ocorreu um erro. Verifique o e-mail digitado ou tente mais tarde.</p>
                ),
                labels: { confirm: 'OK' },
                onConfirm: () => { },
                centered: true,
            });

        } finally {
            setLoading(false);
        }
    }

    return (
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
                        className={`rounded-lg h-12 font-bold text-white transition ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-[#004AAD] hover:bg-blue-500 cursor-pointer"
                            }`}
                    >
                        {loading ? "Enviando..." : "Enviar link de redefinição"}
                    </button>
                </form>
                {mensagem && (
                    <div className="mt-4 text-sm font-semibold text-center text-gray-800">
                        {mensagem}
                    </div>
                )}
                <p className="text-center mt-6 text-sm">
                    Lembrou da senha?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Voltar para login
                    </a>
                </p>

            </div>
        </div>
    )
}

export default EsqueciSenha;