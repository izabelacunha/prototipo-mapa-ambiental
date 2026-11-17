'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function RelatosPage() {
  const [relatos, setRelatos] = useState<any[]>([]);
  const [filtroLocal, setFiltroLocal] = useState('Todos');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/relatos`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setRelatos(data);
      })
      .finally(() => setCarregando(false));
  }, []);

  const locaisUnicos = ['Todos', ...Array.from(new Set(relatos.map((r) => r.local)))];
  const relatosFiltrados = filtroLocal === 'Todos' ? relatos : relatos.filter((r) => r.local === filtroLocal);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-3 bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-emerald-900">Relatos Registrados no Campus</h2>
          <p className="text-xs text-slate-500">Dados persistidos no banco SQLite</p>
        </div>
        <div className="flex gap-2">
          <Link href="/mapa" className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-200 transition">
            Voltar ao Mapa
          </Link>
          <Link href="/relatar" className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition">
            + Novo relato
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {locaisUnicos.map((loc) => (
          <button
            key={loc}
            onClick={() => setFiltroLocal(loc)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
              filtroLocal === loc ? 'bg-emerald-700 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-emerald-50'
            }`}
          >
            {loc}
          </button>
        ))}
      </div>

      {carregando ? (
        <div className="text-center py-10 text-sm text-slate-500">Carregando relatos do banco de dados...</div>
      ) : relatosFiltrados.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-emerald-100 text-center text-slate-500 text-sm">
          Nenhum relato encontrado para este filtro.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {relatosFiltrados.map((rel) => (
            <div key={rel.id} className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                  📍 {rel.local}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                  {rel.status}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base">{rel.categoria}</h3>
              <p className="text-sm text-slate-600">{rel.descricao}</p>
              <div className="pt-2 border-t flex justify-between text-[11px] text-slate-400">
                <span>Protocolo #{rel.id} • Por {rel.autor_nome}</span>
                <span>{rel.data}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
