import { NextResponse } from 'next/server';

// Banco de dados simulado na memória
let relatos = [
  {
    id: "00001",
    titulo: "Lixo no gramado",
    categoria: "Descarte de resíduos",
    local: "Área verde - Meio do campus",
    descricao: "Acúmulo de lixo descartado incorretamente próximo às árvores.",
    status: "Em análise",
    data: "11/10/2026",
    tipo: "problema"
  },
  {
    id: "00002",
    titulo: "Árvore caída",
    categoria: "Manutenção",
    local: "Pátio",
    descricao: "Galho grande caído obstruindo a passagem.",
    status: "Resolvido",
    data: "15/09/2026",
    tipo: "problema"
  }
];

// GET: Retorna os relatos salvos
export async function GET() {
  return NextResponse.json(relatos);
}

// POST: Salva um novo relato enviado pelo formulário
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const novoRelato = {
      id: String(relatos.length + 1).padStart(5, '0'),
      titulo: body.titulo || body.categoria || "Ocorrência Ambiental",
      categoria: body.categoria || "Geral",
      local: body.local || "Não informado",
      descricao: body.descricao || "",
      status: "Enviado",
      data: new Date().toLocaleDateString('pt-BR'),
      tipo: body.tipo || "problema"
    };

    relatos.unshift(novoRelato);
    return NextResponse.json({ success: true, relato: novoRelato }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erro ao processar envio" }, { status: 400 });
  }
}