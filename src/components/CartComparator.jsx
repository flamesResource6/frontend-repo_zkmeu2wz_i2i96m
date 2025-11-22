import React from 'react'
import { storesTotals, cheapestPerProduct, formatCurrency } from '../lib/utils'
import { X } from 'lucide-react'

export default function CartComparator({ open, onClose, cart, products }) {
  const selected = products.filter(p => cart.includes(p.id))
  const totals = storesTotals(cart, products)
  const totalEntries = Object.entries(totals).sort((a,b)=>a[1]-b[1])
  const cheapest = cheapestPerProduct(cart, products)
  return (
    <div className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/50 transition ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose}></div>
      <div className={`absolute bottom-0 left-0 right-0 sm:left-auto sm:right-0 sm:top-0 sm:bottom-0 sm:h-full w-full sm:w-[520px] bg-[#18100B] text-[#F5E9D8] border-t sm:border-l border-[#B8860B]/30 transition-transform ${open ? 'translate-y-0 sm:translate-x-0' : 'translate-y-full sm:translate-x-full'}`}>
        <div className="p-4 flex items-center justify-between border-b border-[#B8860B]/20">
          <div className="font-medium">Carrito Comparador</div>
          <button onClick={onClose} className="p-2 rounded-lg bg-[#1E140F]"><X size={16}/></button>
        </div>
        <div className="p-4 space-y-6">
          <div>
            <div className="text-sm mb-1">Seleccionados ({selected.length})</div>
            <ul className="text-sm list-disc pl-5 opacity-80">
              {selected.map(p => <li key={p.id}>{p.name}</li>)}
            </ul>
          </div>

          <div>
            <div className="font-medium mb-2">Opción A — Más barato por producto</div>
            <div className="rounded-lg border border-[#B8860B]/30 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#1E140F]">
                  <tr>
                    <th className="text-left p-2">Producto</th>
                    <th className="text-left p-2">Tienda</th>
                    <th className="text-right p-2">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {cheapest.lines.map((l,i)=> (
                    <tr key={i} className="odd:bg-[#1E140F]/40">
                      <td className="p-2">{l.name}</td>
                      <td className="p-2">{l.store}</td>
                      <td className="p-2 text-right">{formatCurrency(l.price)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="p-2 font-medium" colSpan={2}>Total</td>
                    <td className="p-2 text-right font-semibold text-[#D4A574]">{formatCurrency(cheapest.total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div>
            <div className="font-medium mb-2">Opción B — Comprar todo en una tienda</div>
            <div className="rounded-lg border border-[#B8860B]/30 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#1E140F]">
                  <tr>
                    <th className="text-left p-2">Tienda</th>
                    <th className="text-right p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {totalEntries.map(([store, total]) => (
                    <tr key={store} className="odd:bg-[#1E140F]/40">
                      <td className="p-2">{store}</td>
                      <td className="p-2 text-right">{formatCurrency(total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalEntries.length>0 && (
              <div className="text-sm mt-2">Mejor opción: <span className="text-[#D4A574] font-medium">{totalEntries[0][0]}</span> con <span className="font-semibold">{formatCurrency(totalEntries[0][1])}</span></div>
            )}
          </div>

          <button className="w-full py-2 rounded-lg bg-[#D4A574] text-[#18100B] font-medium">Exportar carrito (PNG/PDF)</button>
        </div>
      </div>
    </div>
  )
}
