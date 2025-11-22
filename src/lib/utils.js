export const mlToL = (ml) => ml / 1000
export const pricePerLiter = (price, volumeMl) => {
  if (!price || !volumeMl) return 0
  return price / (volumeMl / 1000)
}
export const alcoholPerLiter = (abvPercent, volumeMl) => {
  if (!abvPercent || !volumeMl) return 0
  return (abvPercent / 100) * (volumeMl / 1000)
}
export const alcoholPerQuetzal = (abvPercent, volumeMl, price) => {
  const apl = alcoholPerLiter(abvPercent, volumeMl)
  if (!price) return 0
  return apl / price
}
export const formatCurrency = (n) => `Q${n.toFixed(2)}`
export const formatNumber = (n, d=2) => Number(n || 0).toFixed(d)
export const bestStoreForProduct = (product) => {
  let best = { store: null, price: Infinity }
  Object.entries(product.prices).forEach(([store, price]) => {
    if (price && price > 0 && price < best.price) best = { store, price }
  })
  return best
}
export const rankByMetric = (entries, getter) => entries
  .filter((e) => getter(e) > 0)
  .sort((a,b) => getter(a) - getter(b))

export const storesTotals = (cart, products) => {
  const storeSums = {}
  cart.forEach((id) => {
    const prod = products.find(p => p.id === id)
    if (!prod) return
    Object.entries(prod.prices).forEach(([store, price]) => {
      if (!price || price <= 0) return
      storeSums[store] = (storeSums[store] || 0) + price
    })
  })
  return storeSums
}

export const cheapestPerProduct = (cart, products) => {
  const lines = []
  let total = 0
  cart.forEach((id) => {
    const prod = products.find(p => p.id === id)
    if (!prod) return
    const best = bestStoreForProduct(prod)
    lines.push({ id, name: prod.name, ...best })
    total += best.price
  })
  return { lines, total }
}
