'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SugestaoPage() {
  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [sugestao, setSugestao] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/relatos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        titulo, 
        descricao: sugestao, 
        categoria: 'Sugestão', 
        tipo: 'sugestao' 
      }),
    });
    alert('Sugestão enviada com sucesso!');
    router.push('/relatos');
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-emerald-100 shadow-sm space-y-6">
      <h2 className="text-2xl font-bold text-emerald-900 border-b pb-3">Enviar sugestão ambiental</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Título *</label>
          <input 
            type="text" 
            placeholder="Ex: Mais lixeiras de coleta seletiva no pátio"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full border rounded-lg p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Sua sugestão *</label>
          <textarea 
            rows={5}
            placeholder="Descreva sua ideia de melhoria para o campus..."
            value={sugestao}
            onChange={(e) => setSugestao(e.target.value)}
            className="w-full border rounded-lg p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button type="button" onClick={() => router.back()} className="w-1/2 bg-slate-100 text-slate-700 py-2.5 rounded-lg text-sm font-semibold">
            Cancelar
          </button>
          <button type="submit" className="w-1/2 bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition">
            Enviar sugestão
          </button>
        </div>
      </form>
    </div>
  );
}