// Mock API functions with in-memory data and artificial delays
// No external backend used. Small seeded arrays are used and mutated at runtime.

const wait = (ms = 450) => new Promise((res) => setTimeout(res, ms))

// Seed data
let products = [
  {
    id: crypto.randomUUID(),
    name: 'Acme Widget A',
    sku: 'WID-A-001',
    category: 'Widgets',
    stockByLocation: {
      'Main Warehouse': 120,
      'Secondary Hub': 35,
    },
  },
  {
    id: crypto.randomUUID(),
    name: 'Bolt Pack M6',
    sku: 'BLT-M6-050',
    category: 'Hardware',
    stockByLocation: {
      'Main Warehouse': 400,
      'Secondary Hub': 80,
    },
  },
]

let warehouses = [
  { id: crypto.randomUUID(), name: 'Main Warehouse', code: 'MAIN', address: '100 Industrial Ave' },
  { id: crypto.randomUUID(), name: 'Secondary Hub', code: 'HUB2', address: '22 Logistics Rd' },
]

let activity = [
  { id: crypto.randomUUID(), type: 'receipt', message: 'Received 200x Acme Widget A', ts: new Date().toISOString() },
  { id: crypto.randomUUID(), type: 'delivery', message: 'Delivered 25x Bolt Pack M6', ts: new Date().toISOString() },
]

export async function login({ email, password }) {
  await wait()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 4) {
    throw new Error('Invalid credentials')
  }
  return { token: crypto.randomUUID(), user: { id: crypto.randomUUID(), name: 'StockMaster User', email } }
}

export async function signup({ name, email, password, otp }) {
  await wait()
  if (!name || name.length < 2) throw new Error('Name too short')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email')
  if (password.length < 6) throw new Error('Password too short')
  if (!otp || otp.length < 4) throw new Error('Invalid OTP')
  return { id: crypto.randomUUID(), name, email }
}

export async function fetchKPIs() {
  await wait(300)
  const totalProducts = products.length
  const lowStockItems = products.filter((p) => Object.values(p.stockByLocation).reduce((a, b) => a + b, 0) < 50).length
  return {
    totalProducts,
    lowStockItems,
    pendingReceipts: Math.floor(Math.random() * 5),
    pendingDeliveries: Math.floor(Math.random() * 5),
    internalTransfers: Math.floor(Math.random() * 3),
  }
}

export async function fetchActivity() {
  await wait(300)
  return activity.slice(-8).reverse()
}

export async function fetchProducts() {
  await wait(300)
  return products
}

export async function createOrUpdateProduct(data) {
  await wait(300)
  if (!data.name || !data.sku || !data.category) throw new Error('All fields required')
  if (data.id) {
    products = products.map((p) => (p.id === data.id ? { ...p, ...data } : p))
    return data
  }
  const newItem = { id: crypto.randomUUID(), stockByLocation: {}, ...data }
  products.push(newItem)
  return newItem
}

export async function fetchWarehouses() {
  await wait(250)
  return warehouses
}

export async function createOrUpdateWarehouse(data) {
  await wait(300)
  if (!data.name || !data.code) throw new Error('Name and code required')
  if (data.id) {
    warehouses = warehouses.map((w) => (w.id === data.id ? { ...w, ...data } : w))
    return data
  }
  const newW = { id: crypto.randomUUID(), ...data }
  warehouses.push(newW)
  return newW
}

export async function createReceipt({ supplier, items }) {
  await wait(400)
  if (!supplier || !items?.length) throw new Error('Supplier and at least one item required')
  // Apply stock increments
  items.forEach(({ productId, quantity, location = 'Main Warehouse' }) => {
    const p = products.find((x) => x.id === productId)
    if (!p) return
    p.stockByLocation[location] = (p.stockByLocation[location] || 0) + Number(quantity)
  })
  activity.push({ id: crypto.randomUUID(), type: 'receipt', message: `Receipt validated (${items.length} items)`, ts: new Date().toISOString() })
  return { ok: true }
}

export async function createDelivery({ items }) {
  await wait(400)
  if (!items?.length) throw new Error('At least one item required')
  items.forEach(({ productId, quantity, location = 'Main Warehouse' }) => {
    const p = products.find((x) => x.id === productId)
    if (!p) return
    p.stockByLocation[location] = Math.max(0, (p.stockByLocation[location] || 0) - Number(quantity))
  })
  activity.push({ id: crypto.randomUUID(), type: 'delivery', message: `Delivery validated (${items.length} items)`, ts: new Date().toISOString() })
  return { ok: true }
}

export async function createTransfer({ from, to, productId, quantity }) {
  await wait(350)
  if (!from || !to || !productId || !quantity) throw new Error('All fields required')
  if (from === to) throw new Error('Choose different locations')
  const p = products.find((x) => x.id === productId)
  if (!p) throw new Error('Product not found')
  p.stockByLocation[from] = Math.max(0, (p.stockByLocation[from] || 0) - Number(quantity))
  p.stockByLocation[to] = (p.stockByLocation[to] || 0) + Number(quantity)
  activity.push({ id: crypto.randomUUID(), type: 'transfer', message: `Transferred ${quantity} units`, ts: new Date().toISOString() })
  return { ok: true }
}

export async function adjustStock({ productId, counted, location = 'Main Warehouse' }) {
  await wait(300)
  if (counted < 0) throw new Error('Count must be positive')
  const p = products.find((x) => x.id === productId)
  if (!p) throw new Error('Product not found')
  p.stockByLocation[location] = Number(counted)
  activity.push({ id: crypto.randomUUID(), type: 'adjustment', message: `Adjusted stock for ${p.name}`, ts: new Date().toISOString() })
  return { ok: true }
}
