import { useEffect, useMemo, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Input, Modal, Table } from '../components/ui'
import { createOrUpdateProduct, fetchProducts } from '../lib/api'

export default function Products() {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ id: null, name: '', sku: '', category: '' })
  const [error, setError] = useState('')

  const load = async () => setData(await fetchProducts())
  useEffect(() => { load() }, [])

  const onSave = async () => {
    setError('')
    if (!form.name || !form.sku || !form.category) return setError('Please fill all fields')
    await createOrUpdateProduct(form)
    setOpen(false)
    setForm({ id: null, name: '', sku: '', category: '' })
    await load()
  }

  const columns = ['Name', 'SKU', 'Category', 'Stock per location', '']

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader title="Products" actions={<Button onClick={() => setOpen(true)}>Add product</Button>} />
        <CardBody>
          <Table
            columns={columns}
            data={data}
            renderRow={(p) => (
              <tr key={p.id}>
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3">{p.sku}</td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3 text-slate-600">
                  {Object.entries(p.stockByLocation || {}).map(([loc, qty]) => (
                    <span key={loc} className="inline-flex items-center gap-2 mr-3 text-xs bg-slate-100 px-2 py-1 rounded-full">{loc}: <b className="text-slate-800">{qty}</b></span>
                  ))}
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="outline" onClick={() => { setForm(p); setOpen(true) }}>Edit</Button>
                </td>
              </tr>
            )}
          />
        </CardBody>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title={form.id ? 'Update product' : 'Add product'}>
        <div className="space-y-3">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
          <Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          {error && <p className="text-rose-600 text-sm">{error}</p>}
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={onSave}>{form.id ? 'Save changes' : 'Create'}</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
