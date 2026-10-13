'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [modo, setModo] = useState<'login' | 'cadastro'>('login');

  // Campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [vinculo, setVinculo] = useState('Estudante');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modo === 'login') {
      alert(`Bem-vindo(a) de volta! Login realizado.`);
    } else {
      alert(`Conta criada com sucesso para ${nome}! Agora você já pode entrar.`);
      setModo('login');
      return;
    }
    router.push('/');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-emerald-100 shadow-sm space-y-6 my-8">
      {/* Abas para alternar entre Login e Cadastro */}
      <div className="flex border-b border-emerald-100 pb-2 gap-4">
        <button
          type="button"
          onClick={() => setModo('login')}
          className={`flex-1 text-center py-2 font-bold text-sm rounded-lg transition ${
            modo === 'login'
              ? 'bg-emerald-600 text-white shadow'
              : 'text-slate-500 hover:text-emerald-700'
          }`}
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => setModo('cadastro')}
          className={`flex-1 text-center py-2 font-bold text-sm rounded-lg transition ${
            modo === 'cadastro'
              ? 'bg-emerald-600 text-white shadow'
              : 'text-slate-500 hover:text-emerald-700'
          }`}
        >
          Cadastre-se
        </button>
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-emerald-900">
          {modo === 'login' ? 'Acesse sua conta' : 'Criar nova conta'}
        </h2>
        <p className="text-xs text-slate-500">
          Utilize seu e-mail institucional do IFRN
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campos visíveis apenas no Cadastro */}
        {modo === 'cadastro' && (
          <>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Nome Completo *
              </label>
              <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full border rounded-lg p-2.5 text-sm text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Vínculo com o IFRN *
              </label>
              <select
                value={vinculo}
                onChange={(e) => setVinculo(e.target.value)}
                className="w-full border rounded-lg p-2.5 text-sm text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="Estudante">Estudante</option>
                <option value="Servidor / Docente">Servidor / Docente</option>
                <option value="Técnico Administrativo">Técnico Administrativo</option>
                <option value="Comunidade Externa">Comunidade Externa</option>
              </select>
            </div>
          </>
        )}

        {/* Campos padrão */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            E-mail institucional *
          </label>
          <input
            type="email"
            placeholder="usuario@escolar.ifrn.edu.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-2.5 text-sm text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Senha *
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border rounded-lg p-2.5 text-sm text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition shadow"
        >
          {modo === 'login' ? 'Entrar' : 'Concluir Cadastro'}
        </button>
      </form>

      {/* Botão de alternância no rodapé da caixa */}
      <div className="text-center pt-2">
        {modo === 'login' ? (
          <button
            type="button"
            onClick={() => setModo('cadastro')}
            className="text-xs text-emerald-700 hover:underline font-semibold"
          >
            Não tem conta? Cadastre-se
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setModo('login')}
            className="text-xs text-emerald-700 hover:underline font-semibold"
          >
            Já possui conta? Faça login
          </button>
        )}
      </div>
    </div>
  );
}