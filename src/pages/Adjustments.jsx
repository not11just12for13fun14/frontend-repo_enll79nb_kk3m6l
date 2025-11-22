import { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Input, Select } from '../components/ui'
import { adjustStock, fetchProducts, fetchWarehouses } from '../lib/api'

export default function Adjustments() {
  const [productId, setProductId] = useState('')
  const [location, setLocation] = useState('')
  const [counted, setCounted] = useState('')
  const [products, setProducts] = useState([])
  const [whs, setWhs] = useState([])
  const [diff, setDiff] = useState(null)
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')

  useEffect(() => {
    fetchProducts().then(setProducts)
    fetchWarehouses().then(setWhs)
  }, [])

  useEffect(() => {
    const p = products.find((x) => x.id === productId)
    if (p) {
      const current = p.stockByLocation[location || 'Main Warehouse'] || 0
      if (counted !== '') setDiff(Number(counted) - current)
      else setDiff(null)
    } else setDiff(null)
  }, [productId, location, counted, products])

  const update = async () => {
    setError(''); setOk('')
    if (!productId) return setError('Select a product')
    const n = Number(counted)
    if (!Number.isFinite(n) || n < 0) return setError('Enter a valid positive number')
    await adjustStock({ productId, counted: n, location })
    setOk('Stock updated')
    setProductId(''); setLocation(''); setCounted('')
  }

  return (
    <Card>
      <CardHeader title="Stock Adjustment" subtitle="Reconcile counted stock" />
      <CardBody>
        <div className="grid sm:grid-cols-3 gap-4">
          <Select label="Product" value={productId} onChange={(e) => setProductId(e.target.value)}>
            <option value="">Select product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </Select>
          <Select label="Location" value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">Main Warehouse</option>
            {whs.map((w) => (
              <option key={w.id} value={w.name}>{w.name}</option>
            ))}
          </Select>
          <Input label="Counted quantity" type="number" min={0} value={counted} onChange={(e) => setCounted(e.target.value)} />
        </div>
        {diff !== null && (
          <p className={`mt-3 text-sm ${diff === 0 ? 'text-slate-600' : diff > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            Difference: {diff}
          </p>
        )}
        {error && <p className="text-rose-600 text-sm mt-4">{error}</p>}
        {ok && <p className="text-emerald-600 text-sm mt-4">{ok}</p>}
        <div className="pt-4 flex justify-end">
          <Button onClick={update}>Update stock</Button>
        </div>
      </CardBody>
    </Card>
  )
}
