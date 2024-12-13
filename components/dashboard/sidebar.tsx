'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FileText, RefreshCw, PiggyBank, Gift, Settings } from 'lucide-react'
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: FileText, label: 'Bills', href: '/bills' },
  { icon: RefreshCw, label: 'Reimbursement', href: '/reimbursement' },
  { icon: PiggyBank, label: 'Tax Saving', href: '/tax-saving' },
  { icon: Gift, label: 'My Privileges', href: '/privileges' },
  { icon: Settings, label: 'Setting', href: '/settings' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-60 bg-white p-4 h-screen flex flex-col">
      <div className="flex items-center mb-8">
        <FileText className="h-8 w-8 text-blue-600" />
        <span className="text-xl font-bold ml-2">BillBox</span>
      </div>
      <nav className="flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center p-2 rounded-lg mb-2 cursor-pointer",
              pathname === item.href ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:bg-gray-100"
            )}
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

