'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const LOCAIS_CAMPUS = [
  'Campo de Futebol',
  'Ginásio',
  'Piscina',
  'NEFA',
  'Área de Saúde',
  'Campo de Areia',
  'C.V.',
  'Anexo',
  'Salas de Aula e Lab',
  'Refeitório',
  'Estacionamento',
];

function FormRelatar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const localInicial = searchParams.get('local') || 'NEFA';

  const [categoria, setCategoria] = useState('Descarte de resíduos');
  const [local, setLocal] = useState(LOCAIS_CAMPUS.includes(localInicial) ? localInicial : 'NEFA');
  const [descricao, setDescricao] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    setLogado(!!localStorage.getItem('token'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Você precisa fazer login antes de enviar um relato!');
      router.push('/login');
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch(`${API_URL}/api/relatos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo: `${categoria} - ${local}`,
          categoria,
          local,
          descricao,
          tipo: 'problema',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem('token');
          alert('Sua sessão expirou. Faça login novamente.');
          router.push('/login');
          return;
        }
        throw new Error(data.message || 'Erro ao enviar relato');
      }

      alert('Relato salvo no banco de dados com sucesso!');
      router.push('/mapa');
    } catch (err: any) {
      alert(err.message || 'Erro ao conectar com o servidor.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm space-y-5">
      <div className="border-b pb-3">
        <h2 className="text-xl font-bold text-emerald-900">Relatar Problema Ambiental</h2>
        <p className="text-xs text-slate-500">O relato ficará registrado permanentemente no mapa do campus.</p>
      </div>

      {!logado && (
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs text-amber-900 flex justify-between items-center">
          <span>⚠️ Você precisa estar logado para registrar relatos.</span>
          <Link href="/login" className="bg-amber-600 text-white px-3 py-1 rounded font-bold">
            Fazer Login
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Local do Campus *</label>
          <select
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            className="w-full border rounded-lg p-2.5 text-sm text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            {LOCAIS_CAMPUS.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Categoria do Problema *</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full border rounded-lg p-2.5 text-sm text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="Descarte de resíduos">Descarte irregular de resíduos / Lixo</option>
            <option value="Manutenção de área verde">Manutenção de área verde / Poda</option>
            <option value="Desperdício de água">Vazamento ou desperdício de água</option>
            <option value="Consumo de energia">Luzes ou aparelhos ligados sem uso</option>
            <option value="Outro problema ambiental">Outro problema ambiental</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Descrição detalhada *</label>
          <textarea
            rows={4}
            placeholder="Descreva o que foi observado neste setor do campus..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border rounded-lg p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Link
            href="/mapa"
            className="flex-1 text-center bg-slate-100 text-slate-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-200 transition"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={enviando}
            className="flex-1 bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition shadow disabled:opacity-50"
          >
            {enviando ? 'Salvando...' : 'Enviar Relato'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function RelatarPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Carregando formulário...</div>}>
      <FormRelatar />
    </Suspense>
  );
}
