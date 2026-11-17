import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbDir = path.join(process.cwd(), 'database');
const dbFile = path.join(dbDir, 'dados.json');

interface Relato {
  id: string;
  titulo: string;
  categoria: string;
  local: string;
  descricao: string;
  status: string;
  data: string;
  tipo: string;
}

const DADOS_INICIAIS: Relato[] = [
  {
    id: '00001',
    titulo: 'Lixo no gramado',
    categoria: 'Descarte de resíduos',
    local: 'C.V.',
    descricao: 'Acúmulo de lixo descartado incorretamente próximo ao Centro de Vivência.',
    status: 'Em análise',
    data: '11/10/2026',
    tipo: 'problema',
  },
  {
    id: '00002',
    titulo: 'Árvore caída',
    categoria: 'Manutenção',
    local: 'Refeitório',
    descricao: 'Galho grande caído obstruindo a passagem próximo ao refeitório.',
    status: 'Resolvido',
    data: '15/09/2026',
    tipo: 'problema',
  },
];

function lerBanco(): Relato[] {
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify(DADOS_INICIAIS, null, 2), 'utf-8');
    return DADOS_INICIAIS;
  }
  const conteudo = fs.readFileSync(dbFile, 'utf-8');
  return JSON.parse(conteudo);
}

function salvarBanco(relatos: Relato[]) {
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  fs.writeFileSync(dbFile, JSON.stringify(relatos, null, 2), 'utf-8');
}

// GET: Lê os relatos gravados em database/dados.json
export async function GET() {
  try {
    const relatos = lerBanco();
    return NextResponse.json(relatos);
  } catch (error) {
    console.error('Erro ao ler database/dados.json:', error);
    return NextResponse.json([], { status: 500 });
  }
}

// POST: Salva um novo relato ou sugestão em database/dados.json
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const relatos = lerBanco();

    const novoRelato: Relato = {
      id: String(relatos.length + 1).padStart(5, '0'),
      titulo: body.titulo || body.categoria || 'Ocorrência Ambiental',
      categoria: body.categoria || 'Geral',
      local: body.local || 'Não informado',
      descricao: body.descricao || '',
      status: 'Enviado',
      data: new Date().toLocaleDateString('pt-BR'),
      tipo: body.tipo || 'problema',
    };

    relatos.unshift(novoRelato);
    salvarBanco(relatos);

    return NextResponse.json({ success: true, relato: novoRelato }, { status: 201 });
  } catch (error) {
    console.error('Erro ao gravar em database/dados.json:', error);
    return NextResponse.json({ success: false, message: 'Erro ao processar envio' }, { status: 400 });
  }
}