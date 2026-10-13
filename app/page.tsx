import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="space-y-8 py-4">
      {/* Hero Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-8 text-center md:text-left md:flex items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-900">
            Mapa Ambiental do IFRN-PAR
          </h1>
          <p className="text-slate-600 leading-relaxed">
            Conheça, acompanhe e contribua com as condições ambientais do nosso campus.
          </p>
          <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
            <Link 
              href="/mapa" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow transition"
            >
              Explorar o mapa
            </Link>
            <Link 
              href="/relatar" 
              className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-5 py-2.5 rounded-lg font-semibold transition"
            >
              + Novo relato
            </Link>
          </div>
        </div>

        <div className="mt-6 md:mt-0 flex justify-center">
          <div className="w-48 h-48 relative border-4 border-emerald-500 rounded-full overflow-hidden shadow-lg bg-emerald-100">
            <Image 
              src="/logo.png" 
              alt="Logo do projeto" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Grid de Atalhos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/relatar" className="bg-white p-6 rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition text-center space-y-2 group">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-xl font-bold group-hover:scale-110 transition">
            !
          </div>
          <span className="block font-semibold text-emerald-900">Relatar um problema</span>
        </Link>

        <Link href="/relatos" className="bg-white p-6 rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition text-center space-y-2 group">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-xl font-bold group-hover:scale-110 transition">
            🔍
          </div>
          <span className="block font-semibold text-emerald-900">Consultar relatos</span>
        </Link>

        <Link href="/areas-verdes" className="bg-white p-6 rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition text-center space-y-2 group">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-xl font-bold group-hover:scale-110 transition">
            🌳
          </div>
          <span className="block font-semibold text-emerald-900">Áreas verdes</span>
        </Link>

        <Link href="/mapa" className="bg-white p-6 rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition text-center space-y-2 group">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-xl font-bold group-hover:scale-110 transition">
            ♻️
          </div>
          <span className="block font-semibold text-emerald-900">Pontos de descarte</span>
        </Link>
      </div>
    </div>
  );
}