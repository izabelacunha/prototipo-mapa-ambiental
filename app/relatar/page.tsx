'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RelatarPage() {
  const router = useRouter();
  const [categoria, setCategoria] = useState('');
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [protocolo, setProtocolo] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoria || !descricao) {
      alert('Por favor, preencha os campos obrigatórios (*)');
      return;
    }

    const res = await fetch('/api/relatos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categoria, local, descricao, tipo: 'problema' }),
    });

    const data = await res.json();
    if (data.success) {
      setProtocolo(data.relato.id);
    }
  };

  if (protocolo) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-emerald-100 shadow-sm text-center space-y-4 my-8">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 text-3xl rounded-full flex items-center justify-center mx-auto">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-emerald-900">Relato enviado com sucesso!</h2>
        <p className="text-slate-600 text-sm">O seu registro foi incluído e está aguardando análise.</p>
        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg font-mono font-bold text-emerald-800">
          Protocolo #{protocolo}
        </div>
        <div className="pt-4 flex gap-3">
          <button onClick={() => router.push('/relatos')} className="flex-1 bg-emerald-600 text-white py-2 rounded-lg text-sm font-semibold">
            Acompanhar
          </button>
          <button onClick={() => setProtocolo(null)} className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-lg text-sm font-semibold">
            Novo Relato
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-emerald-100 shadow-sm space-y-6">
      <h2 className="text-2xl font-bold text-emerald-900 border-b pb-3">Relatar problema ambiental</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Categoria do problema *</label>
          <select 
            value={categoria} 
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full border rounded-lg p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          >
            <option value="">Selecione...</option>
            <option value="Descarte de resíduos">Descarte de resíduos</option>
            <option value="Vazamento / Água">Vazamento / Água</option>
            <option value="Manutenção de área verde">Manutenção de área verde</option>
            <option value="Poluição / Drenagem">Poluição / Drenagem</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Local do problema *</label>
          <input 
            type="text" 
            placeholder="Ex: Bloco C, Pátio, Gramado Central..."
            value={local} 
            onChange={(e) => setLocal(e.target.value)}
            className="w-full border rounded-lg p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Descrição da ocorrência *</label>
          <textarea 
            rows={4}
            placeholder="Descreva a situação detalhadamente..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border rounded-lg p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Imagem da ocorrência (Opcional)</label>
          <input type="file" accept="image/*" className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
        </div>

        <div className="flex gap-3 pt-4">
          <button type="button" onClick={() => router.back()} className="w-1/2 bg-slate-100 text-slate-700 py-2.5 rounded-lg text-sm font-semibold">
            Cancelar
          </button>
          <button type="submit" className="w-1/2 bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}