'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Relato {
  id: string;
  titulo: string;
  local: string;
  categoria: string;
  data: string;
  status: string;
  descricao: string;
}

export default function RelatosPage() {
  const [relatos, setRelatos] = useState<Relato[]>([
    {
      id: '00001',
      titulo: 'Lixo no gramado',
      local: 'Área verde - Meio do campus',
      categoria: 'Descarte de resíduos',
      data: '11/10/2026',
      status: 'Em análise',
      descricao: 'Acúmulo de lixo descartado incorretamente próximo às árvores.',
    },
    {
      id: '00002',
      titulo: 'Árvore caída',
      local: 'Pátio',
      categoria: 'Manutenção',
      data: '15/09/2026',
      status: 'Resolvido',
      descricao: 'Galho grande caído obstruindo a passagem.',
    },
  ]);

  const [busca, setBusca] = useState('');
  const [filtroLocal, setFiltroLocal] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');
  const [relatoSelecionado, setRelatoSelecionado] = useState<Relato>(relatos[0]);

  // Carrega dados da API se existirem novos relatos enviados
  useEffect(() => {
    async function carregarRelatos() {
      try {
        const res = await fetch('/api/relatos');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setRelatos(data);
            setRelatoSelecionado(data[0]);
          }
        }
      } catch (err) {
        console.error('Erro ao carregar relatos:', err);
      }
    }
    carregarRelatos();
  }, []);

  // Lógica de filtragem por palavra-chave, local, categoria e status
  const relatosFiltrados = relatos.filter((item) => {
    const atendeBusca = (item.titulo || '').toLowerCase().includes(busca.toLowerCase()) ||
                        (item.descricao || '').toLowerCase().includes(busca.toLowerCase());
    const atendeLocal = filtroLocal === '' || item.local === filtroLocal;
    const atendeCategoria = filtroCategoria === '' || item.categoria === filtroCategoria;
    const atendeStatus = filtroStatus === '' || item.status === filtroStatus;

    return atendeBusca && atendeLocal && atendeCategoria && atendeStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Título da Página */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
          Relatos e Sugestões Ambientais
        </h1>
        <Link 
          href="/relatar" 
          className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-4 py-2 rounded-xl text-xs shadow transition flex items-center gap-1"
        >
          + Relatar problema
        </Link>
      </div>

      {/* Contêiner de Duas Colunas (Lista + Detalhes) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Coluna Esquerda: Pesquisa, Filtros e Lista de Relatos */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Campo de Pesquisa */}
          <div className="relative">
            <input 
              type="text"
              placeholder="Pesquisar por palavra-chave....."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full bg-white border border-emerald-200 rounded-xl p-3 pl-10 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-sm"
            />
            <span className="absolute left-3.5 top-3 text-slate-400 text-xs">🔍</span>
          </div>

          {/* Menus de Filtro */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700">
            <span>Filtrar por:</span>
            
            <select 
              value={filtroLocal} 
              onChange={(e) => setFiltroLocal(e.target.value)}
              className="bg-white border border-emerald-200 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:ring-1 focus:ring-emerald-500 shadow-sm"
            >
              <option value="">Localização (Todas)</option>
              <option value="Área verde - Meio do campus">Área verde - Meio do campus</option>
              <option value="Pátio">Pátio</option>
              <option value="Bloco A">Bloco A</option>
              <option value="Bloco C">Bloco C</option>
            </select>

            <select 
              value={filtroCategoria} 
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="bg-white border border-emerald-200 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:ring-1 focus:ring-emerald-500 shadow-sm"
            >
              <option value="">Categoria (Todas)</option>
              <option value="Descarte de resíduos">Descarte de resíduos</option>
              <option value="Manutenção">Manutenção</option>
            </select>

            <select 
              value={filtroStatus} 
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="bg-white border border-emerald-200 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:ring-1 focus:ring-emerald-500 shadow-sm"
            >
              <option value="">Status (Todos)</option>
              <option value="Em análise">Em análise</option>
              <option value="Resolvido">Resolvido</option>
              <option value="Enviado">Enviado</option>
            </select>
          </div>

          {/* Lista de Relatos */}
          <div className="space-y-3">
            {relatosFiltrados.length > 0 ? (
              relatosFiltrados.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setRelatoSelecionado(item)}
                  className={`bg-white border p-4 rounded-2xl shadow-sm transition cursor-pointer hover:border-emerald-500 ${
                    relatoSelecionado?.id === item.id ? 'border-2 border-emerald-600 ring-2 ring-emerald-100' : 'border-emerald-100'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {item.categoria}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      item.status === 'Resolvido' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm">{item.titulo}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.descricao}</p>

                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-3 border-t border-slate-100 pt-2">
                    <span>📍 {item.local}</span>
                    <span>📅 {item.data}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-6 rounded-2xl border text-center text-xs text-slate-500">
                Nenhum relato encontrado com os filtros selecionados.
              </div>
            )}
          </div>

        </div>

        {/* Coluna Direita: Painel "Detalhes do Relato" */}
        <div className="lg:col-span-5 sticky top-20">
          {relatoSelecionado ? (
            <div className="bg-white border border-emerald-200 p-5 rounded-2xl shadow-md space-y-4">
              <div className="border-b pb-3 flex justify-between items-center">
                <h2 className="font-bold text-slate-900 text-base">Detalhes do relato</h2>
                <span className="text-xs font-mono text-slate-400">#{relatoSelecionado.id}</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-emerald-950">{relatoSelecionado.titulo}</h3>
                <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-3 rounded-xl border">
                  {relatoSelecionado.descricao}
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700">
                <p><strong>Local:</strong> {relatoSelecionado.local}</p>
                <p><strong>Categoria:</strong> {relatoSelecionado.categoria}</p>
                <p><strong>Data de envio:</strong> {relatoSelecionado.data}</p>
              </div>

              {/* Linha do Tempo do Status */}
              <div className="border-t pt-3 space-y-2">
                <p className="text-xs font-bold text-slate-800">Evolução do Status:</p>
                <div className="pl-4 border-l-2 border-emerald-300 space-y-3 text-xs">
                  <div className="relative">
                    <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full absolute -left-[21px] top-1"></span>
                    <span className="font-semibold text-slate-800">Enviado</span>
                  </div>
                  <div className="relative">
                    <span className={`w-2.5 h-2.5 rounded-full absolute -left-[21px] top-1 ${
                      relatoSelecionado.status !== 'Enviado' ? 'bg-emerald-600' : 'bg-slate-300'
                    }`}></span>
                    <span className="font-semibold text-slate-800">Em análise</span>
                  </div>
                  <div className="relative">
                    <span className={`w-2.5 h-2.5 rounded-full absolute -left-[21px] top-1 ${
                      relatoSelecionado.status === 'Resolvido' ? 'bg-emerald-600' : 'bg-slate-300'
                    }`}></span>
                    <span className="font-semibold text-slate-800">Resolvido</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link 
                  href="/mapa"
                  className="block text-center w-full border border-emerald-600 text-emerald-800 hover:bg-emerald-50 py-2 rounded-xl text-xs font-bold transition shadow-sm"
                >
                  Ver no mapa
                </Link>
              </div>

            </div>
          ) : (
            <div className="bg-white p-6 rounded-2xl border text-center text-xs text-slate-400">
              Selecione um relato à esquerda para ver os detalhes.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}