'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function LoginPage() {
  const router = useRouter();
  const [modo, setModo] = useState<'login' | 'cadastro'>('login');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [vinculo, setVinculo] = useState('Estudante');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [usuarioLogado, setUsuarioLogado] = useState<{ name: string; email: string; role?: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userSalvo = localStorage.getItem('user');
    if (token && userSalvo) {
      try {
        setUsuarioLogado(JSON.parse(userSalvo));
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUsuarioLogado(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      if (modo === 'cadastro') {
        const res = await fetch(`${API_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: `${nome} (${vinculo})`, email, password: senha }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Erro ao criar conta');

        alert('Conta criada com sucesso! Agora faça login.');
        setModo('login');
        setCarregando(false);
        return;
      }

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: senha }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'E-mail ou senha inválidos');

      if (data.token) {
        localStorage.setItem('token', data.token);
        const userObj = data.user || { name: email.split('@')[0], email };
        localStorage.setItem('user', JSON.stringify(userObj));
        setUsuarioLogado(userObj);
        router.push('/mapa');
      }
    } catch (err: any) {
      setErro(err.message || 'Erro de conexão com o servidor.');
    } finally {
      setCarregando(false);
    }
  };

  if (usuarioLogado) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-emerald-100 shadow-sm space-y-5 my-8 text-center">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
          ✓
        </div>
        <h2 className="text-xl font-bold text-emerald-900">Você está logado(a)!</h2>
        <p className="text-sm text-slate-600">
          Conectado(a) como <strong>{usuarioLogado.name}</strong> ({usuarioLogado.email})
        </p>
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => router.push('/mapa')}
            className="flex-1 bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition"
          >
            Ir para o Mapa
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 bg-red-50 text-red-700 border border-red-200 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-100 transition"
          >
            Sair da conta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-emerald-100 shadow-sm space-y-6 my-8">
      <div className="flex border-b border-emerald-100 pb-2 gap-4">
        <button
          type="button"
          onClick={() => { setModo('login'); setErro(''); }}
          className={`flex-1 text-center py-2 font-bold text-sm rounded-lg transition ${
            modo === 'login' ? 'bg-emerald-600 text-white shadow' : 'text-slate-500 hover:text-emerald-700'
          }`}
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => { setModo('cadastro'); setErro(''); }}
          className={`flex-1 text-center py-2 font-bold text-sm rounded-lg transition ${
            modo === 'cadastro' ? 'bg-emerald-600 text-white shadow' : 'text-slate-500 hover:text-emerald-700'
          }`}
        >
          Cadastre-se
        </button>
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-emerald-900">
          {modo === 'login' ? 'Acesse sua conta' : 'Criar nova conta'}
        </h2>
        <p className="text-xs text-slate-500">Utilize seu e-mail institucional do IFRN</p>
      </div>

      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg font-medium">
          ⚠️ {erro}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {modo === 'cadastro' && (
          <>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nome Completo *</label>
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
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Vínculo com o IFRN *</label>
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

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">E-mail institucional *</label>
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
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Senha * (mínimo 6 caracteres)</label>
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
          disabled={carregando}
          className="w-full bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition shadow disabled:opacity-50"
        >
          {carregando ? 'Processando...' : modo === 'login' ? 'Entrar' : 'Concluir Cadastro'}
        </button>
      </form>
    </div>
  );
}
