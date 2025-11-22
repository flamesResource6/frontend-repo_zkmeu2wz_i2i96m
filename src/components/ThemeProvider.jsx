import React from 'react'

// Apply brand theme via CSS variables & utility helpers
export default function ThemeProvider({ children }) {
  return (
    <div className="min-h-screen bg-[#1E140F] text-[#F5E9D8]" style={{
      '--bg-wood': '#1E140F',
      '--bg-wood-2': '#18100B',
      '--amber': '#D4A574',
      '--gold': '#B8860B',
      '--cream': '#F5E9D8',
    }}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'radial-gradient(circle at 20% 10%, rgba(212,165,116,0.3), transparent 35%), radial-gradient(circle at 80% 90%, rgba(184,134,11,0.25), transparent 35%)'
        }}></div>
        <div className="absolute inset-0 mix-blend-overlay" style={{
          backgroundImage: 'linear-gradient(0deg, rgba(0,0,0,0.4), transparent 20%, transparent 80%, rgba(0,0,0,0.4)), repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 6px)'
        }}></div>
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
