import React, { useMemo, useState } from 'react'
import Navbar from './Navbar'
import FilterPills from './FilterPills'
import FeaturedDeals from './FeaturedDeals'
import ProductDetail from './ProductDetail'
import FiltersDrawer from './FiltersDrawer'
import ComparisonView from './ComparisonView'
import CartComparator from './CartComparator'
import { PRODUCTS } from '../data/mock'

export default function Home() {
  const [query, setQuery] = useState('')
  const [categories, setCategories] = useState([])
  const [detail, setDetail] = useState(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [filters, setFilters] = useState({
    maxPrice: 600,
    minAbv: 0,
    minVol: 0,
    onlyOffers: false,
    stores: [],
    allStores: ["Walmart","Paiz","La Torre","PriceSmart","Maxi Despensa","El Gallo Negro","La Licorera"],
  })

  const filtered = useMemo(()=>{
    return PRODUCTS.filter(p => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase())
      const matchesCat = categories.length ? categories.includes(p.category) : true
      const hasPriceUnderMax = Math.min(...Object.values(p.prices).filter(n=>n&&n>0)) <= filters.maxPrice
      const abvOk = p.abv >= filters.minAbv
      const volOk = p.volumeMl >= filters.minVol
      const offersOk = filters.onlyOffers ? (p.promoTags?.length>0) : true
      const storeOk = filters.stores.length ? Object.entries(p.prices).some(([s,pr])=> filters.stores.includes(s) && pr && pr>0) : true
      return matchesQuery && matchesCat && hasPriceUnderMax && abvOk && volOk && offersOk && storeOk
    })
  }, [query, categories, filters])

  const addToCart = (id) => setCart(prev => prev.includes(id) ? prev : [...prev, id])

  return (
    <>
      <Navbar query={query} setQuery={setQuery} onOpenFilters={()=>setFiltersOpen(true)} onOpenCart={()=>setCartOpen(true)} />
      <FilterPills active={categories} setActive={setCategories} />
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="text-sm text-[#F5E9D8]/70">Ofertas destacadas</div>
      </div>
      <FeaturedDeals products={filtered} onOpenDetail={setDetail} onAdd={addToCart} />
      <ComparisonView products={filtered.slice(0,4)} />
      <ProductDetail product={detail} onClose={()=>setDetail(null)} onAdd={addToCart} />
      <FiltersDrawer open={filtersOpen} onClose={()=>setFiltersOpen(false)} filters={filters} setFilters={setFilters} />
      <CartComparator open={cartOpen} onClose={()=>setCartOpen(false)} cart={cart} products={PRODUCTS} />
    </>
  )
}
