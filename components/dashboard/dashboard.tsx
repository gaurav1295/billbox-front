import { Sidebar } from './sidebar'
import { ExpenseCard } from '../components/expense-card'
import { RecentTransactions } from './recent-transactions'
import { MonthlyActivityChart } from '../components/monthly-activity-chart'
import { ExpenseStatistics } from '../components/expense-statistics'
import { QuickLinks } from './quick-links'
import { Input } from "@/components/ui/input"
import { Bell, Settings } from 'lucide-react'
import Image from 'next/image'

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <header className="bg-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Overview</h1>
          <div className="flex items-center space-x-4">
            <Input type="search" placeholder="Search for something" className="w-64" />
            <Settings className="h-6 w-6 text-gray-500" />
            <Bell className="h-6 w-6 text-gray-500" />
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </header>
        <main className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">My Expenses</h2>
              <span className="text-blue-600 text-sm cursor-pointer">See All</span>
            </div>
            <div className="flex space-x-4">
              <ExpenseCard month="November" year={2024} total={5756} reimbursement={5000} taxSaving={700} isActive={true} />
              <ExpenseCard month="October" year={2024} total={5756} reimbursement={2000} taxSaving={3756} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <RecentTransactions />
            <MonthlyActivityChart />
            <ExpenseStatistics />
            <QuickLinks />
          </div>
        </main>
      </div>
    </div>
  )
}

