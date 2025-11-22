import React from 'react'
import { formatCurrency, alcoholPerQuetzal, pricePerLiter, bestStoreForProduct } from '../lib/utils'

export default function FeaturedDeals({ products, onOpenDetail, onAdd }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(p => {
        const best = bestStoreForProduct(p)
        const apq = alcoholPerQuetzal(p.abv, p.volumeMl, best.price)
        const ppl = pricePerLiter(best.price, p.volumeMl)
        return (
          <div key={p.id} className="group bg-[#18100B] rounded-xl border border-[#B8860B]/20 overflow-hidden hover:border-[#D4A574]/50 transition relative shadow-[0_10px_25px_rgba(0,0,0,0.35)]">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute top-2 left-2 flex gap-2">
                {p.promoTags?.slice(0,2).map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-md text-xs bg-[#D4A574] text-[#18100B]">{tag}</span>
                ))}
              </div>
            </div>
            <div className="p-3 space-y-2">
              <div className="font-medium leading-tight">{p.name}</div>
              <div className="text-xs text-[#F5E9D8]/70">{(p.volumeMl/1000).toFixed(2)} L • {p.abv}% ABV</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg text-[#D4A574] font-semibold">{formatCurrency(best.price)} <span className="text-xs text-[#F5E9D8]/70">{best.store}</span></div>
                  <div className="text-[11px] text-[#F5E9D8]/60">{formatCurrency(ppl)} / L</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-[#F5E9D8]/60">Alcohol/Q</div>
                  <div className="text-sm font-semibold text-[#B8860B]">{apq.toFixed(3)}</div>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={()=>onOpenDetail(p)} className="flex-1 px-3 py-1.5 rounded-lg border border-[#B8860B]/30 hover:border-[#D4A574]/60 transition">Detalles</button>
                <button onClick={()=>onAdd(p.id)} className="px-3 py-1.5 rounded-lg bg-[#D4A574] text-[#18100B] hover:brightness-110 transition">Agregar</button>
              </div>
              <div className="text-[10px] text-[#F5E9D8]/50">Última actualización: {p.updatedAt}</div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
