import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mapa Ambiental IFRN-PAR',
  description: 'Sistema de monitoramento e gestão ambiental do IFRN Campus Parnamirim',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-emerald-50 text-slate-800 min-h-screen flex flex-col font-sans">
        
        {/* Cabeçalho Único com Barra Ampliada */}
        <header className="bg-[#206b05] text-white shadow-md sticky top-0 z-50 py-2">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
            
            {/* Logo PNG Grande e Orgânica + Nome do Projeto */}
            <Link href="/" className="flex items-center gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 relative flex-shrink-0">
                <Image 
                  src="/logo.png" 
                  alt="Logo Mapa Ambiental IFRN" 
                  fill
                  sizes="(max-width: 640px) 96px, 112px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl sm:text-2xl leading-tight text-white">
                  Mapa Ambiental
                </span>
                <span className="text-xs sm:text-sm text-emerald-300 font-medium">
                  IFRN - Campus Parnamirim
                </span>
              </div>
            </Link>

            {/* Menu Único e Alinhado na Direita */}
            <nav className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-emerald-200 transition">Início</Link>
              <Link href="/mapa" className="hover:text-emerald-200 transition">Mapa</Link>
              <Link href="/relatos" className="hover:text-emerald-200 transition">Relatos</Link>
              <Link href="/login" className="bg-[#206b05] hover:bg-[#206b05] text-white px-4 py-2 rounded-lg transition text-xs border border-emerald-600 shadow-sm">
                Entrar / Cadastro
              </Link>
            </nav>
            
          </div>
        </header>

        {/* Conteúdo Central */}
        <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6">
          {children}
        </main>

        {/* Rodapé */}
        <footer className="bg-[#206b05] text-emerald-200 text-center py-4 text-xs">
          INSTITUTO FEDERAL DO RIO GRANDE DO NORTE — Câmpus Parnamirim
        </footer>
      </body>
    </html>
  );
}