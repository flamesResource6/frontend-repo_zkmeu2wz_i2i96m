import React from 'react'
import { X } from 'lucide-react'
import { formatCurrency, alcoholPerQuetzal, pricePerLiter } from '../lib/utils'

export default function ProductDetail({ product, onClose, onAdd }) {
  if (!product) return null
  return (
    <div className="fixed inset-0 z-40 grid place-items-end sm:place-items-center bg-black/50 p-0 sm:p-6">
      <div className="w-full sm:max-w-2xl bg-[#18100B] text-[#F5E9D8] rounded-t-2xl sm:rounded-2xl border border-[#B8860B]/30 overflow-hidden shadow-2xl">
        <div className="relative">
          <img src={product.image} className="w-full h-56 object-cover" />
          <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full bg-black/50"><X size={16}/></button>
        </div>
        <div className="p-4 space-y-3">
          <div className="text-xl font-semibold">{product.name}</div>
          <div className="text-sm text-[#F5E9D8]/70">{(product.volumeMl/1000).toFixed(2)} L • {product.abv}% ABV</div>
          <button onClick={()=>onAdd(product.id)} className="w-full py-2 rounded-lg bg-[#D4A574] text-[#18100B] font-medium">Agregar al Carrito Comparador</button>

          <div className="pt-2">
            <div className="font-medium mb-2">Comparar Precios</div>
            <div className="max-h-64 overflow-auto rounded-lg border border-[#B8860B]/20">
              <table className="w-full text-sm">
                <thead className="bg-[#1E140F] sticky top-0">
                  <tr>
                    <th className="text-left p-2">Tienda</th>
                    <th className="text-right p-2">Precio</th>
                    <th className="text-right p-2">Q/L</th>
                    <th className="text-right p-2">Alc/Q</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(product.prices).map(([store, price]) => {
                    if (!price || price <= 0) return null
                    const ppl = pricePerLiter(price, product.volumeMl)
                    const apq = alcoholPerQuetzal(product.abv, product.volumeMl, price)
                    return (
                      <tr key={store} className="odd:bg-[#1E140F]/40">
                        <td className="p-2">{store}</td>
                        <td className="p-2 text-right">{formatCurrency(price)}</td>
                        <td className="p-2 text-right">{formatCurrency(ppl)}</td>
                        <td className="p-2 text-right text-[#B8860B] font-medium">{apq.toFixed(3)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="text-[11px] text-[#F5E9D8]/50 mt-2">Historial de precios y selector de sucursal próximamente.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
