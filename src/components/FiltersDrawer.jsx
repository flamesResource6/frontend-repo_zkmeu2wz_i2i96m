import React from 'react'
import { X } from 'lucide-react'

export default function FiltersDrawer({ open, onClose, filters, setFilters }) {
  const update = (key, val) => setFilters(prev => ({ ...prev, [key]: val }))
  return (
    <div className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/50 transition ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose}></div>
      <div className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-[#18100B] text-[#F5E9D8] border-l border-[#B8860B]/30 transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 flex items-center justify-between border-b border-[#B8860B]/20">
          <div className="font-medium">Filtros</div>
          <button onClick={onClose} className="p-2 rounded-lg bg-[#1E140F]">
            <X size={16} />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="text-sm">Rango de precio (Q)</label>
            <input type="range" min={0} max={600} value={filters.maxPrice} onChange={e=>update('maxPrice', Number(e.target.value))} className="w-full"/>
            <div className="text-xs opacity-70">Hasta Q{filters.maxPrice}</div>
          </div>
          <div>
            <label className="text-sm">ABV mínimo %</label>
            <input type="range" min={0} max={50} value={filters.minAbv} onChange={e=>update('minAbv', Number(e.target.value))} className="w-full"/>
            <div className="text-xs opacity-70">{filters.minAbv}%</div>
          </div>
          <div>
            <label className="text-sm">Volumen mínimo (ml)</label>
            <input type="range" min={0} max={2000} step={50} value={filters.minVol} onChange={e=>update('minVol', Number(e.target.value))} className="w-full"/>
            <div className="text-xs opacity-70">{filters.minVol} ml</div>
          </div>
          <div>
            <label className="text-sm">Solo ofertas</label>
            <input type="checkbox" checked={filters.onlyOffers} onChange={e=>update('onlyOffers', e.target.checked)} className="ml-2 align-middle"/>
          </div>
          <div>
            <label className="text-sm">Tiendas</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {filters.allStores.map(s => {
                const on = filters.stores.includes(s)
                return (
                  <button key={s} onClick={()=>update('stores', on ? filters.stores.filter(x=>x!==s) : [...filters.stores, s])} className={`px-2 py-1 rounded-lg text-sm border ${on? 'bg-[#D4A574] text-[#18100B] border-[#D4A574]' : 'bg-[#1E140F] border-[#B8860B]/30'}`}>{s}</button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
