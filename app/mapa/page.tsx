'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function MapaPage() {
  const [areaSelecionada, setAreaSelecionada] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
        <h2 className="text-xl font-bold text-emerald-900">Mapa Ambiental do Campus</h2>
        <div className="flex gap-2">
          <Link href="/relatar" className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition">
            + Novo relato
          </Link>
          <Link href="/sugestao" className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-200 transition">
            + Sugestão
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Simulação do Mapa */}
        <div className="md:col-span-2 bg-emerald-200 rounded-2xl h-96 relative border-2 border-emerald-400 p-4 flex flex-col justify-between overflow-hidden shadow-inner">
          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg text-xs font-semibold text-emerald-900 space-y-1 w-max shadow">
            <div>📍 Legenda do Mapa:</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-green-500 rounded-full"></span> Área Verde</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-amber-500 rounded-full"></span> Problema Ambiental</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-500 rounded-full"></span> Ponto de Descarte</div>
          </div>

          {/* Marcador Interativo no Mapa */}
          <button 
            onClick={() => setAreaSelecionada(true)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded-full shadow-lg transition transform hover:scale-110 flex items-center gap-2"
          >
            <span>🌳</span>
            <span className="text-xs">Área Verde (Meio do Campus)</span>
          </button>

          <div className="text-right text-xs text-emerald-800 font-medium">
            Clique na área marcada no mapa para ver os detalhes
          </div>
        </div>

        {/* Painel Lateral com Detalhes da Área Selecionada */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm space-y-4">
          {areaSelecionada ? (
            <>
              <div className="border-b pb-3">
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded font-semibold">Tipo: Área verde</span>
                <h3 className="text-lg font-bold text-emerald-900 mt-2">Meio do Campus</h3>
                <p className="text-xs text-emerald-600">Estado: Conservada</p>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <p><strong>Descrição:</strong> Vasto gramado no centro do campus com árvores nativas.</p>
                <p><strong>Responsável:</strong> Jardinagem</p>
                <p><strong>Última manutenção:</strong> 22/09/2026</p>
              </div>

              <div className="border-t pt-3 space-y-2">
                <h4 className="font-semibold text-xs text-slate-500 uppercase">Problemas relatados aqui</h4>
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs space-y-1">
                  <div className="flex justify-between font-bold text-amber-900">
                    <span>⚠️ Lixo no gramado</span>
                    <span className="text-amber-700">Em análise</span>
                  </div>
                  <p className="text-slate-600">Encontrado descarte irregular próximo ao bloco central.</p>
                </div>
              </div>

              <Link 
                href="/relatar" 
                className="block text-center w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition"
              >
                + Relatar problema neste local
              </Link>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-4">
              <span className="text-3xl mb-2">🗺️</span>
              <p className="text-sm">Clique em um ponto marcado do mapa para visualizar as informações da área.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}