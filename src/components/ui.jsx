export function Card({ className = '', children }) {
  return <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm ${className}`}>{children}</div>
}

export function CardHeader({ title, subtitle, actions }) {
  return (
    <div className="p-5 border-b border-slate-200 flex items-center justify-between">
      <div>
        <h3 className="text-slate-900 font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {actions}
    </div>
  )
}

export function CardBody({ children, className = '' }) {
  return <div className={`p-5 ${className}`}>{children}</div>
}

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const styles = {
    primary: 'bg-[#1E88E5] text-white hover:bg-[#1876c5]',
    secondary: 'bg-[#0D47A1] text-white hover:bg-[#0b3d8e]',
    outline: 'border border-slate-300 text-slate-700 hover:bg-slate-50',
  }
  return (
    <button
      className={`px-4 h-10 rounded-xl text-sm font-medium transition-colors ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function Input({ label, error, ...props }) {
  return (
    <label className="block">
      {label && <span className="text-sm text-slate-700 mb-1 block">{label}</span>}
      <input
        className={`w-full h-10 px-3 rounded-xl border ${error ? 'border-rose-400' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-[#1E88E5]/30`}
        {...props}
      />
      {error && <span className="text-xs text-rose-500 mt-1 block">{error}</span>}
    </label>
  )
}

export function Select({ label, error, children, ...props }) {
  return (
    <label className="block">
      {label && <span className="text-sm text-slate-700 mb-1 block">{label}</span>}
      <select
        className={`w-full h-10 px-3 rounded-xl border bg-white ${error ? 'border-rose-400' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-[#1E88E5]/30`}
        {...props}
      >
        {children}
      </select>
      {error && <span className="text-xs text-rose-500 mt-1 block">{error}</span>}
    </label>
  )
}

export function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
          <button className="text-slate-500 hover:text-slate-900" onClick={onClose}>✕</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

export function Table({ columns = [], data = [], renderRow }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} className="text-left px-4 py-3 font-medium text-slate-500">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row) => renderRow(row))}
        </tbody>
      </table>
    </div>
  )
}
