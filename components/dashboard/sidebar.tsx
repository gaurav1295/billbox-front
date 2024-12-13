import Link from 'next/link'
import { Home, FileText, RefreshCw, PiggyBank, BarChart2, Settings } from 'lucide-react'

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: FileText, label: 'Bills', href: '/bills' },
  { icon: RefreshCw, label: 'Reimbursement', href: '/reimbursement' },
  { icon: PiggyBank, label: 'Tax Saving', href: '/tax-saving' },
  { icon: BarChart2, label: 'Reports', href: '/reports' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export function Sidebar() {
  return (
    <div className="w-64 border-r bg-white h-screen">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 text-2xl font-semibold text-blue-600">
          <span className="text-3xl">📦</span>
          Billbox
        </Link>
      </div>
      <nav className="px-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

