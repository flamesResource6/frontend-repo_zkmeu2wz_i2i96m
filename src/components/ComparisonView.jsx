import React from 'react'
import { formatCurrency, pricePerLiter, alcoholPerQuetzal } from '../lib/utils'

export default function ComparisonView({ products }) {
  if (!products?.length) return null
  // compute bests per metric
  const rows = products.flatMap(p => Object.entries(p.prices).filter(([,price])=>price&&price>0).map(([store, price])=>({
    product: p,
    store,
    price,
    ppl: pricePerLiter(price, p.volumeMl),
    apq: alcoholPerQuetzal(p.abv, p.volumeMl, price)
  })))
  const cheapest = rows.reduce((a,b)=> (a && a.price < b.price) ? a : b, null)
  const bestPpl = rows.reduce((a,b)=> (a && a.ppl < b.ppl) ? a : b, null)
  const bestApq = rows.reduce((a,b)=> (a && a.apq > b.apq) ? a : b, null)

  const isHighlight = (r) => r===cheapest || r===bestPpl || r===bestApq

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <div className="text-lg font-medium mb-2">Comparación rápida</div>
      <div className="overflow-auto rounded-xl border border-[#B8860B]/30">
        <table className="w-full text-sm">
          <thead className="bg-[#1E140F]">
            <tr>
              <th className="text-left p-2">Producto</th>
              <th className="text-left p-2">Tienda</th>
              <th className="text-right p-2">Precio</th>
              <th className="text-right p-2">Q/L</th>
              <th className="text-right p-2">Alc/Q</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i)=> (
              <tr key={i} className={`odd:bg-[#1E140F]/40 ${isHighlight(r)?'bg-[#D4A574]/10':''}`}>
                <td className="p-2">{r.product.name}</td>
                <td className="p-2">{r.store}</td>
                <td className="p-2 text-right">{formatCurrency(r.price)}</td>
                <td className="p-2 text-right">{formatCurrency(r.ppl)}</td>
                <td className="p-2 text-right text-[#B8860B] font-medium">{r.apq.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 text-xs text-[#F5E9D8]/70">Resaltado: más barato, mejor Q/L y mejor Alc/Q.</div>
    </section>
  )
}
