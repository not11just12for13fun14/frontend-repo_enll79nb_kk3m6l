import { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Input, Modal, Table } from '../components/ui'
import { createOrUpdateWarehouse, fetchWarehouses } from '../lib/api'

export default function SettingsWarehouses() {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ id: null, name: '', code: '', address: '' })
  const [error, setError] = useState('')

  const load = async () => setData(await fetchWarehouses())
  useEffect(() => { load() }, [])

  const onSave = async () => {
    setError('')
    if (!form.name || !form.code) return setError('Name and code required')
    await createOrUpdateWarehouse(form)
    setOpen(false)
    setForm({ id: null, name: '', code: '', address: '' })
    await load()
  }

  const columns = ['Name', 'Code', 'Address', '']

  return (
    <Card>
      <CardHeader title="Warehouses" actions={<Button onClick={() => setOpen(true)}>Add warehouse</Button>} />
      <CardBody>
        <Table
          columns={columns}
          data={data}
          renderRow={(w) => (
            <tr key={w.id}>
              <td className="px-4 py-3">{w.name}</td>
              <td className="px-4 py-3">{w.code}</td>
              <td className="px-4 py-3">{w.address}</td>
              <td className="px-4 py-3 text-right">
                <Button variant="outline" onClick={() => { setForm(w); setOpen(true) }}>Edit</Button>
              </td>
            </tr>
          )}
        />
      </CardBody>

      <Modal open={open} onClose={() => setOpen(false)} title={form.id ? 'Update warehouse' : 'Add warehouse'}>
        <div className="space-y-3">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
          <Input label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          {error && <p className="text-rose-600 text-sm">{error}</p>}
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={onSave}>{form.id ? 'Save changes' : 'Create'}</Button>
          </div>
        </div>
      </Modal>
    </Card>
  )
}
