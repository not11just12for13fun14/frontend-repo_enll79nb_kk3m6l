import { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Input, Select } from '../components/ui'
import { createTransfer, fetchProducts, fetchWarehouses } from '../lib/api'

export default function Transfers() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [productId, setProductId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [products, setProducts] = useState([])
  const [whs, setWhs] = useState([])
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')

  useEffect(() => {
    fetchProducts().then(setProducts)
    fetchWarehouses().then(setWhs)
  }, [])

  const validate = async () => {
    setError(''); setOk('')
    if (!from || !to) return setError('Choose both locations')
    if (!productId) return setError('Select a product')
    if (!quantity || Number(quantity) <= 0) return setError('Quantity must be positive')
    try {
      await createTransfer({ from, to, productId, quantity })
      setOk('Transfer validated')
      setFrom(''); setTo(''); setProductId(''); setQuantity(1)
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <Card>
      <CardHeader title="Internal Transfer" subtitle="Move stock between locations" />
      <CardBody>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select label="From" value={from} onChange={(e) => setFrom(e.target.value)}>
            <option value="">Select</option>
            {whs.map((w) => (
              <option key={w.id} value={w.name}>{w.name}</option>
            ))}
          </Select>
          <Select label="To" value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="">Select</option>
            {whs.map((w) => (
              <option key={w.id} value={w.name}>{w.name}</option>
            ))}
          </Select>
          <Select label="Product" value={productId} onChange={(e) => setProductId(e.target.value)}>
            <option value="">Select product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </Select>
          <Input label="Quantity" type="number" min={1} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        {error && <p className="text-rose-600 text-sm mt-4">{error}</p>}
        {ok && <p className="text-emerald-600 text-sm mt-4">{ok}</p>}

        <div className="pt-4 flex justify-end">
          <Button onClick={validate}>Validate transfer</Button>
        </div>
      </CardBody>
    </Card>
  )
}
