'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Setor {
  id: number;
  nome: string;
  tipo: string;
  top: string;
  left: string;
  icon: string;
  desc: string;
}

export default function MapaPage() {
  const [setores, setSetores] = useState<Setor[]>([]);
  const [setorAtivo, setSetorAtivo] = useState<Setor | null>(null);
  const [relatos, setRelatos] = useState<any[]>([]);
  const [usuario, setUsuario] = useState<{ name: string } | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const userSalvo = localStorage.getItem('user');
    if (userSalvo) {
      try { setUsuario(JSON.parse(userSalvo)); } catch {}
    }

    Promise.all([
      fetch(`${API_URL}/api/setores`).then((res) => res.json()),
      fetch(`${API_URL}/api/relatos`).then((res) => res.json()),
    ])
      .then(([dadosSetores, dadosRelatos]) => {
        if (Array.isArray(dadosSetores)) {
          setSetores(dadosSetores);
          const padrao = dadosSetores.find((s) => s.nome === 'C.V.') || dadosSetores[0] || null;
          setSetorAtivo(padrao);
        }
        if (Array.isArray(dadosRelatos)) {
          setRelatos(dadosRelatos);
        }
      })
      .catch((err) => console.error('Erro ao carregar dados da API:', err))
      .finally(() => setCarregando(false));
  }, []);

  const relatosDoSetor = setorAtivo ? relatos.filter((r) => r.local === setorAtivo.nome) : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-3 bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-emerald-900">Mapa Ambiental do Campus</h2>
          <p className="text-xs text-slate-500">
            {usuario ? `Logado(a) como ${usuario.name}` : 'Faça login para registrar novos relatos no campus'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {!usuario && (
            <Link href="/login" className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-900 transition">
              Entrar / Login
            </Link>
          )}
          <Link
            href={setorAtivo ? `/relatar?local=${encodeURIComponent(setorAtivo.nome)}` : '/relatar'}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition"
          >
            + Novo relato
          </Link>
          <Link href="/relatos" className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-200 transition">
            Ver todos ({relatos.length})
          </Link>
        </div>
      </div>

      {/* Barra rápida carregada dinamicamente do banco de dados */}
      <div className="flex flex-wrap gap-2">
        {carregando ? (
          <span className="text-xs text-slate-500">Carregando setores do banco de dados...</span>
        ) : (
          setores.map((s) => {
            const qtd = relatos.filter((r) => r.local === s.nome).length;
            const ativo = setorAtivo?.id === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSetorAtivo(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 border ${
                  ativo
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                    : 'bg-white text-slate-700 border-emerald-200 hover:bg-emerald-50'
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.nome}</span>
                {qtd > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${ativo ? 'bg-amber-400 text-slate-900' : 'bg-amber-100 text-amber-900'}`}>
                    {qtd}
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 bg-emerald-100 rounded-2xl aspect-video w-full relative border-2 border-emerald-400 overflow-hidden shadow-inner">
          <img
            src="/mapa-campus.jpg"
            alt="Mapa do Campus"
            className="w-full h-full object-fill pointer-events-none select-none"
          />

          <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-[10px] font-semibold text-emerald-900 flex items-center gap-3 shadow z-10 pointer-events-none">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-600 rounded-full"></span> Normal</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span> Com relatos</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-slate-900 rounded-full"></span> Selecionado</span>
          </div>

          {setores.map((setor) => {
            const qtd = relatos.filter((r) => r.local === setor.nome).length;
            const selecionado = setorAtivo?.id === setor.id;
            return (
              <button
                key={setor.id}
                type="button"
                onClick={() => setSetorAtivo(setor)}
                style={{ top: setor.top, left: setor.left }}
                title={setor.nome}
                className={`absolute -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold shadow-md transition transform hover:scale-110 flex items-center gap-1 ${
                  selecionado
                    ? 'bg-slate-900 text-white ring-4 ring-emerald-400 z-20 scale-110'
                    : qtd > 0
                    ? 'bg-amber-500 text-white hover:bg-amber-600 z-10'
                    : 'bg-emerald-700/95 text-white hover:bg-emerald-800 z-10'
                }`}
              >
                <span>{setor.icon}</span>
                <span className="whitespace-nowrap hidden sm:inline">{setor.nome}</span>
                {qtd > 0 && <span className="bg-white text-slate-900 rounded-full px-1.5 text-[9px]">{qtd}</span>}
              </button>
            );
          })}
        </div>

        {/* Painel Lateral */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm space-y-4 flex flex-col justify-between">
          {setorAtivo ? (
            <>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded font-semibold">
                    {setorAtivo.tipo}
                  </span>
                  <h3 className="text-lg font-bold text-emerald-900 mt-2 flex items-center gap-2">
                    <span>{setorAtivo.icon}</span> {setorAtivo.nome}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">{setorAtivo.desc}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-xs text-slate-500 uppercase">
                    Relatos neste local ({relatosDoSetor.length})
                  </h4>

                  {relatosDoSetor.length === 0 ? (
                    <p className="text-xs text-slate-400 bg-slate-50 p-3 rounded-lg">
                      Nenhum problema ambiental registrado neste setor até o momento.
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                      {relatosDoSetor.map((rel) => (
                        <div key={rel.id} className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs space-y-1">
                          <div className="flex justify-between font-bold text-amber-900">
                            <span>⚠️ {rel.categoria}</span>
                            <span className="text-amber-700">{rel.status}</span>
                          </div>
                          <p className="text-slate-700">{rel.descricao}</p>
                          <p className="text-[10px] text-slate-500">Por: {rel.autor_nome} • {rel.data}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <Link
                href={`/relatar?local=${encodeURIComponent(setorAtivo.nome)}`}
                className="block text-center w-full bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition"
              >
                + Relatar problema em {setorAtivo.nome}
              </Link>
            </>
          ) : (
            <p className="text-xs text-slate-500">
              {carregando ? 'Carregando informações do setor...' : 'Nenhum setor encontrado no banco de dados.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
