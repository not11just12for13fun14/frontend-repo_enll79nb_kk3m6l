import { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Input, Select } from '../components/ui'
import { createDelivery, fetchProducts, fetchWarehouses } from '../lib/api'

export default function Deliveries() {
  const [items, setItems] = useState([{ productId: '', quantity: 1, location: '' }])
  const [products, setProducts] = useState([])
  const [whs, setWhs] = useState([])
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')

  useEffect(() => {
    fetchProducts().then(setProducts)
    fetchWarehouses().then(setWhs)
  }, [])

  const addLine = () => setItems((x) => [...x, { productId: '', quantity: 1, location: '' }])
  const update = (i, patch) => setItems((arr) => arr.map((it, idx) => (idx === i ? { ...it, ...patch } : it)))

  const validate = async () => {
    setError(''); setOk('')
    if (!items.length) return setError('Add at least one product')
    for (const it of items) {
      if (!it.productId) return setError('Select product for all lines')
      if (!it.quantity || Number(it.quantity) <= 0) return setError('Quantity must be positive')
    }
    await createDelivery({ items })
    setOk('Delivery validated')
    setItems([{ productId: '', quantity: 1, location: '' }])
  }

  return (
    <Card>
      <CardHeader title="New Delivery" subtitle="Record outgoing goods" />
      <CardBody>
        <div className="space-y-3">
          {items.map((it, i) => (
            <div key={i} className="grid sm:grid-cols-3 gap-3">
              <Select label="Product" value={it.productId} onChange={(e) => update(i, { productId: e.target.value })}>
                <option value="">Select product</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </Select>
              <Input label="Quantity" type="number" min={1} value={it.quantity} onChange={(e) => update(i, { quantity: e.target.value })} />
              <Select label="Location" value={it.location} onChange={(e) => update(i, { location: e.target.value })}>
                <option value="">Main Warehouse</option>
                {whs.map((w) => (
                  <option key={w.id} value={w.name}>{w.name}</option>
                ))}
              </Select>
            </div>
          ))}
          <Button variant="outline" onClick={addLine}>Add another product</Button>
        </div>

        {error && <p className="text-rose-600 text-sm mt-4">{error}</p>}
        {ok && <p className="text-emerald-600 text-sm mt-4">{ok}</p>}

        <div className="pt-4 flex items-center gap-2 justify-end">
          <Button variant="outline">Pick</Button>
          <Button variant="outline">Pack</Button>
          <Button onClick={validate}>Validate Delivery</Button>
        </div>
      </CardBody>
    </Card>
  )
}
