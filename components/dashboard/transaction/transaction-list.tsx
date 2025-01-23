"use client"

import { useState } from "react"
import { Music2, Fuel, Car, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTransactions } from "@/hooks/use-transaction"
import { BillListMeta } from "@/lib/billClient"
import { BillDetailsDialog } from "../task-detail-dialog"
import { TaskProgress } from "../task-progress"

const iconMap = {
  spotify: Music2,
  fuel: Fuel,
  travel: Car,
}

const colorMap = {
  spotify: "bg-purple-100 text-purple-600",
  fuel: "bg-emerald-100 text-emerald-600",
  travel: "bg-amber-100 text-amber-600",
}

export function TransactionsList({ transactions }: {transactions: Array<BillListMeta>}) {
  
  const [selectedBill, setSelectedBill] = useState<BillListMeta | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xl font-semibold text-gray-800">Recent Transactions</h3>
        <Button
          variant="outline"
          size="sm"
          className="text-sm font-medium text-gray-600 border-gray-300 hover:bg-gray-50"
        >
          See All
        </Button>
      </div>
      <div className="rounded-xl border bg-white shadow-sm divide-y divide-gray-200">
        {transactions.map((transaction, index) => {
          const Icon = iconMap[transaction.category as keyof typeof iconMap] || Music2
          const iconColor = colorMap[transaction.category as keyof typeof colorMap] || "bg-gray-100 text-gray-600"
          const isProcessing = transaction.tracking && transaction.tracking.progress.percentageComplete < 100

          return (
            <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`rounded-full p-2 ${iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg leading-tight text-gray-800">{transaction.title}</h4>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800 text-lg">-Rs.{transaction.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">
                    {transaction.category} | {transaction.subCategory}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex-grow mr-4">
                  {isProcessing && transaction.tracking ? (
                    <TaskProgress tracking={transaction.tracking} />
                  ) : (
                    <div className="h-6" /> // Placeholder to maintain consistent height
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className={`h-8 w-24 rounded-lg px-3 text-xs font-medium transition-all duration-200 ${
                    isProcessing
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-300"
                  }`}
                  onClick={() => {
                    setSelectedBill(transaction)
                    setDialogOpen(true)
                  }}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "View Bill"}
                </Button>
              </div>
            </div>
          )
        })}
      </div>
      <BillDetailsDialog bill={selectedBill} open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}

