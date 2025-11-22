import { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader } from '../components/ui'
import { fetchKPIs, fetchActivity } from '../lib/api'

export default function Dashboard() {
  const [kpis, setKpis] = useState(null)
  const [logs, setLogs] = useState([])

  useEffect(() => {
    fetchKPIs().then(setKpis)
    fetchActivity().then(setLogs)
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total products', value: kpis?.totalProducts ?? '—' },
          { label: 'Low stock items', value: kpis?.lowStockItems ?? '—' },
          { label: 'Pending receipts', value: kpis?.pendingReceipts ?? '—' },
          { label: 'Pending deliveries', value: kpis?.pendingDeliveries ?? '—' },
          { label: 'Internal transfers', value: kpis?.internalTransfers ?? '—' },
        ].map((k) => (
          <Card key={k.label}>
            <CardBody>
              <div className="text-2xl font-semibold text-[#0D47A1]">{k.value}</div>
              <div className="text-sm text-slate-600 mt-1">{k.label}</div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader title="Recent activity" subtitle="Latest inventory movements" />
        <CardBody>
          <ul className="space-y-3">
            {logs.map((l) => (
              <li key={l.id} className="flex items-center justify-between">
                <span className="text-slate-700">{l.message}</span>
                <span className="text-xs text-slate-400">{new Date(l.ts).toLocaleString()}</span>
              </li>
            ))}
            {!logs.length && <p className="text-slate-500 text-sm">No activity yet.</p>}
          </ul>
        </CardBody>
      </Card>
    </div>
  )
}
