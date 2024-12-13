/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpenseCard } from "@/components/dashboard/expense-card"
import { ExpenseStatistics } from "@/components/dashboard/expense-statistics"
import { FileUpload } from "@/components/dashboard/file-upload"
import { Header } from "@/components/dashboard/header"
import { MonthlyActivity } from "@/components/dashboard/statistics"
import { TransactionsList } from "@/components/dashboard/transaction-list"
import { Sidebar } from "lucide-react"

// This is where you would replace with your API call
async function getData() {
  return {
    expenses: [
      {
        month: 'November',
        year: 2024,
        total: 15756,
        reimbursement: 5750,
        taxSaving: 10000,
      },
      {
        month: 'October',
        year: 2024,
        total: 10075,
        reimbursement: 2075,
        taxSaving: 8000,
        isPending: true,
      },
    ],
    transactions: [
      {
        id: '1',
        icon: 'spotify',
        title: 'Spotify Subscription',
        date: '25 Nov 2021',
        timestamp: '06 Dec, 12.30 AM',
        documentId: '#12548796',
        documentType: 'PDF Upload',
        category: 'Tax Saving',
        subCategory: 'Books & Periodicals',
        amount: 2500,
      },
      // Add more transactions here
    ],
    monthlyActivity: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Reimbursement',
          data: [400, 300, 200, 300, 200, 400],
          color: 'rgba(37, 99, 235, 1)',
        },
        {
          label: 'Annual Tax',
          data: [200, 150, 100, 200, 100, 300],
          color: 'rgba(74, 222, 128, 1)',
        },
      ],
    },
    expenseStats: {
      labels: ['Others', 'Investment', 'Entertainment', 'Bill Expense'],
      datasets: [
        {
          data: [35, 20, 30, 15],
          backgroundColor: [
            'rgba(37, 99, 235, 1)',
            'rgba(74, 222, 128, 1)',
            'rgba(251, 113, 133, 1)',
            'rgba(250, 204, 21, 1)',
          ],
        },
      ],
    },
  }
}

export default async function Dashboard() {
  const data: any = await getData()

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="grid grid-cols-3 gap-6">
              {data.expenses.map((expense: any, i: any) => (
                <ExpenseCard key={i} {...expense} />
              ))}
              <FileUpload />
            </div>
            
            <TransactionsList transactions={data.transactions} />
            
            <div className="grid grid-cols-2 gap-6">
              <MonthlyActivity data={data.monthlyActivity} />
              <ExpenseStatistics />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

