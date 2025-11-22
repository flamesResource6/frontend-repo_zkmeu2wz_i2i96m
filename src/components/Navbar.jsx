import React from 'react'
import { Search, ShoppingCart, SlidersHorizontal } from 'lucide-react'

export default function Navbar({ query, setQuery, onOpenFilters, onOpenCart }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-[#1E140F]/70 bg-[#1E140F]/80 border-b border-[#B8860B]/20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="text-amber-300 font-serif text-xl tracking-wide" style={{fontFamily:'Playfair Display, serif'}}>El Alcoholímetro</div>
        <div className="flex-1"></div>
        <button onClick={onOpenFilters} className="p-2 rounded-lg bg-[#18100B] text-[#F5E9D8] border border-[#B8860B]/20 hover:border-[#B8860B]/40 transition">
          <SlidersHorizontal size={18} />
        </button>
        <button onClick={onOpenCart} className="p-2 rounded-lg bg-[#18100B] text-[#F5E9D8] border border-[#B8860B]/20 hover:border-[#B8860B]/40 transition">
          <ShoppingCart size={18} />
        </button>
      </div>
      <div className="max-w-6xl mx-auto px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4A574]" size={18} />
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar marcas, categorías..." className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#18100B] text-[#F5E9D8] placeholder-[#D4A574]/60 border border-[#B8860B]/20 focus:outline-none focus:ring-2 focus:ring-[#D4A574]/40" />
        </div>
      </div>
    </header>
  )
}
