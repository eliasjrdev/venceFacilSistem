
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="font-sans text-gray-800">
    
      <section className="text-center py-20 bg-gradient-to-b from-blue-50 to-green-50">
        <h1 className="text-5xl font-bold">
          <span className="text-blue-600">Vence</span>
          <span className="text-green-600">Fácil</span>
        </h1>
        <p className="mt-6 text-xl font-semibold">Nunca mais perca produtos por vencimento.</p>
        <p className="mt-2 text-gray-600 max-w-xl mx-auto">
          Um sistema gratuito e simples para controlar validades de produtos em pequenos comércios.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-300 ease-in-out shadow hover:scale-105"
          >
            Acessar o Sistema
          </Link>

        </div>

      </section>

 
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Sobre o Projeto</h2>
        <p className="max-w-2xl mx-auto">
          O <span className="text-blue-600 font-semibold">VenceFácil</span> foi desenvolvido como uma solução real para ajudar comerciantes a controlarem a validade de seus produtos.
        </p>
        <p className="mt-2 max-w-2xl mx-auto">
          O objetivo é oferecer um sistema eficiente, simples e acessível para todos — sem custos ou complicações.
        </p>
        <div className="mt-4 inline-block px-6 py-2 rounded-full bg-blue-50 text-blue-600 font-medium shadow">
          💡 Sistema 100% gratuito
        </div>
      </section>

   
      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-8">Do Problema à Solução</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 px-4">
          <div className="bg-red-100 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold text-red-600 mb-2">😟 O Problema</h3>
            <ul className="text-left list-disc list-inside text-sm text-gray-700">
              <li>Controle manual com cadernos e planilhas</li>
              <li>Esquecimentos constantes de datas de validade</li>
              <li>Prejuízos por produtos vencidos</li>
              <li>Tempo perdido procurando informações</li>
            </ul>
          </div>
          <div className="bg-green-100 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold text-green-600 mb-2">✨ A Solução</h3>
            <ul className="text-left list-disc list-inside text-sm text-gray-700">
              <li>Sistema digital moderno e intuitivo</li>
              <li>Alertas automáticos de produtos próximos ao vencimento</li>
              <li>Redução de perdas e desperdícios</li>
              <li>Acesso rápido e organizado às informações</li>
            </ul>
          </div>
        </div>
        <p className="mt-6 text-base text-gray-700">
          Uma solução <span className="text-green-600 font-semibold">gratuita</span>, <span className="text-blue-600 font-semibold">moderna</span> e <span className="text-purple-600 font-semibold">fácil de usar</span>
        </p>
      </section>

    
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-2">Funcionalidades do Sistema</h2>
        <p className="mb-10 text-gray-600">Todas as ferramentas necessárias para um controle eficiente de validades</p>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { title: "Cadastro e Login", desc: "Sistema seguro de autenticação para proteger seus dados" },
            { title: "Gestão de Produtos", desc: "Cadastre produtos com nome, lote e data de validade facilmente" },
            { title: "Filtros Inteligentes", desc: "Visualize produtos válidos, próximos do vencimento ou vencidos" },
            { title: "Edição Simples", desc: "Edite e exclua produtos diretamente na lista principal" },
            { title: "Totalmente Responsivo", desc: "Interface adaptada para desktop, tablet e smartphone" },
            { title: "Interface Leve", desc: "Design limpo, moderno e otimizado para performance" },
          ].map(({ title, desc }) => (
            <div className="p-6 border rounded-lg shadow-sm bg-white hover:shadow-md hover:scale-105 transition duration-300" key={title}>
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      
      <section className="py-16 px-4 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-4">Tecnologias Utilizadas</h2>
        <p className="mb-8 text-gray-600">Stack moderna para máxima performance e escalabilidade</p>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { title: "React", color: "bg-blue-100", desc: "Biblioteca JavaScript para interfaces" },
            { title: "Vite", color: "bg-purple-100", desc: "Build tool moderna e rápida" },
            { title: "Tailwind CSS", color: "bg-cyan-100", desc: "Framework CSS utility-first" },
            { title: "Firebase Auth", color: "bg-orange-100", desc: "Autenticação segura" },
            { title: "Firestore", color: "bg-yellow-100", desc: "Banco de dados em nuvem" },
            { title: "Mantine UI", color: "bg-indigo-100", desc: "Componentes para modais e feedback" },
          ].map(({ title, desc, color }) => (
            <div className={`p-4 rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition duration-300 ${color}`} key={title}>
              <h3 className="font-bold text-lg mb-1">{title}</h3>
              <p className="text-sm text-gray-700">{desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-gray-700">
          <strong>Arquitetura:</strong> SPA (Single Page Application) com autenticação Firebase, armazenamento em tempo real e interface responsiva
        </p>
      </section>

  
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-green-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-2">Quer ver como isso tudo funciona na prática?</h2>
        <p className="mb-6 text-white">Explore o sistema completo e descubra como ele pode transformar o controle de estoque do seu negócio.</p>
        <button className="bg-white text-blue-600 px-6 py-3 font-medium rounded hover:bg-blue-100 cursor-pointer">Ver Demonstração do Sistema</button>
        <div className="mt-6 flex justify-center gap-10 text-xl">
          <div>
            <p className="font-bold">100%</p>
            <p className="text-sm">Gratuito</p>
          </div>
          <div>
            <p className="font-bold">0</p>
            <p className="text-sm">Configuração</p>
          </div>
          <div>
            <p className="font-bold">∞</p>
            <p className="text-sm">Produtos</p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white text-center py-8 px-4">
        <h2 className="text-xl font-bold">
          <span className="text-blue-500">Vence</span>
          <span className="text-green-400">Fácil</span>
        </h2>
        <p className="mt-2 text-sm text-gray-400 max-w-xl mx-auto">
          Sistema gratuito desenvolvido para fins educacionais, com foco em resolver problemas reais de pequenos comerciantes.
        </p>
        <div className="mt-4 flex justify-center gap-6 text-sm">
          <a href="https://github.com/eliasjrdev" className="hover:underline">GitHub do desenvolvedor</a>
          <a href="https://www.linkedin.com/in/elias-c/" className="hover:underline">LinkedIn do Desenvolvedor</a>
        </div>
        <p className="mt-4 text-xs text-gray-500">© 2024 VenceFácil. Sistema gratuito, feito para fins educacionais.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
