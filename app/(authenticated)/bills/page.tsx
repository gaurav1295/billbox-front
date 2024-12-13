import { CreditCard } from "@/components/dashboard/credit-card"
import { ExpenseChart } from "@/components/dashboard/expense-chart"
import { TransactionTable } from "@/components/dashboard/transaction-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { Settings, Bell } from "lucide-react"
// import { Bell, CreditCard, Settings } from 'lucide-react'
// import Image from "next/image"

export default function BillsPage() {
  return (
    <>
      <header className="bg-white p-4 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <div className="flex items-center space-x-4">
          <Input type="search" placeholder="Search for something" className="w-64" />
          <Settings className="h-6 w-6 text-gray-500" />
          <Bell className="h-6 w-6 text-gray-500" />
          <SignedIn>
              <UserButton />
            </SignedIn>
        </div>
      </header>
      
      <main className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Bills</h2>
            <Button>+ Add Bill</Button>
          </div>
          <div className="flex space-x-4">
            <CreditCard 
              balance={5756}
              cardHolder="EDDY CUSUMA"
              validThru="12/22"
              cardNumber="3778 **** **** 1234"
              isActive={true}
            />
            <CreditCard 
              balance={5756}
              cardHolder="EDDY CUSUMA"
              validThru="12/22"
              cardNumber="3778 **** **** 1234"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-6">Recent Transactions</h3>
              <TransactionTable />
            </div>
          </div>
          <div>
            <ExpenseChart />
          </div>
        </div>
      </main>
    </>
  )
}

