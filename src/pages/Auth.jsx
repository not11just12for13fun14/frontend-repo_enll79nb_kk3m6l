import { useState } from 'react'
import { Button, Card, CardBody, Input } from '../components/ui'
import { login, signup } from '../lib/api'
import { Link, useNavigate } from 'react-router-dom'

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const nav = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!validateEmail(form.email)) return setError('Enter a valid email')
    if (!form.password) return setError('Password required')
    try {
      await login(form)
      nav('/')
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="min-h-[70vh] grid place-items-center">
      <Card className="w-full max-w-md">
        <CardBody>
          <h2 className="text-xl font-semibold mb-6 text-[#0D47A1]">Welcome back</h2>
          <form className="space-y-4" onSubmit={onSubmit}>
            <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            {error && <p className="text-rose-600 text-sm">{error}</p>}
            <div className="flex items-center justify-between">
              <Link to="#" className="text-sm text-[#1E88E5] hover:underline">Reset via OTP</Link>
              <Button type="submit">Login</Button>
            </div>
          </form>
          <p className="text-sm text-slate-500 mt-4">No account? <Link to="/signup" className="text-[#1E88E5]">Create one</Link></p>
        </CardBody>
      </Card>
    </div>
  )
}

export function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', otp: '' })
  const [error, setError] = useState('')
  const nav = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name) return setError('Name required')
    if (!validateEmail(form.email)) return setError('Valid email required')
    if (form.password.length < 6) return setError('At least 6 characters password')
    if (!form.otp) return setError('Enter OTP sent to your email')
    try {
      await signup(form)
      nav('/login')
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="min-h-[70vh] grid place-items-center">
      <Card className="w-full max-w-md">
        <CardBody>
          <h2 className="text-xl font-semibold mb-6 text-[#0D47A1]">Create your account</h2>
          <form className="space-y-4" onSubmit={onSubmit}>
            <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <Input label="OTP" value={form.otp} onChange={(e) => setForm({ ...form, otp: e.target.value })} />
            {error && <p className="text-rose-600 text-sm">{error}</p>}
            <div className="flex items-center justify-between">
              <Link to="/login" className="text-sm text-[#1E88E5] hover:underline">Back to Login</Link>
              <Button type="submit">Sign up</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
