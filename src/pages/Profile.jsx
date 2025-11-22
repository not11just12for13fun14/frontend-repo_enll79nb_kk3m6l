import { Button, Card, CardBody } from '../components/ui'

export default function Profile() {
  return (
    <div className="max-w-xl">
      <Card>
        <CardBody>
          <h2 className="text-xl font-semibold text-[#0D47A1]">My Profile</h2>
          <p className="text-sm text-slate-600 mt-1">StockMaster User</p>
          <div className="mt-6 flex items-center gap-2">
            <Button variant="outline">Edit Profile</Button>
            <Button variant="secondary">Logout</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
