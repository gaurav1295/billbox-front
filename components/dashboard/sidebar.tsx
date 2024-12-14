'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FileText, RefreshCw, PiggyBank, BarChart2, Settings } from 'lucide-react'

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: FileText, label: 'Bills', href: '/bills' },
  { icon: RefreshCw, label: 'Reimbursement', href: '/reimbursement' },
  { icon: PiggyBank, label: 'Tax Saving', href: '/tax-saving' },
  { icon: BarChart2, label: 'Reports', href: '/reports' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      <div className="hidden md:block w-64 border-r bg-white h-screen">
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
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                pathname === item.href
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
        <nav className="flex justify-around">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-2 ${
                pathname === item.href ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

