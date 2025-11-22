import React from 'react'

const CATS = ['Cerveza','Ron','Whisky','Vodka','Tequila','Vino']

export default function FilterPills({ active, setActive }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
      {CATS.map(c => {
        const on = active.includes(c)
        return (
          <button key={c} onClick={()=>{
            setActive(on ? active.filter(x=>x!==c) : [...active, c])
          }} className={`px-3 py-1 rounded-full border text-sm whitespace-nowrap transition ${on ? 'bg-[#D4A574] text-[#18100B] border-[#D4A574]' : 'bg-[#18100B] text-[#F5E9D8] border-[#B8860B]/30 hover:border-[#B8860B]/50'}`}>
            {c}
          </button>
        )
      })}
    </div>
  )
}
