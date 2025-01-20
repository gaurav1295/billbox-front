import { Music2, Fuel, Car } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BillListMeta } from '@/lib/billClient'

const iconMap = {
  spotify: Music2,
  fuel: Fuel,
  travel: Car,
}

const colorMap = {
  spotify: 'bg-cyan-100',
  fuel: 'bg-pink-100',
  travel: 'bg-blue-100',
}

export function TransactionsList({ transactions }: { transactions: BillListMeta[] }) {
  if (!transactions || transactions.length <= 0) {
    return <div>No data</div>
  }
  
  return (
    <div className="bg-white rounded-xl">
      <div className="flex items-center justify-between p-6 border-b">
        <h3 className="text-lg font-semibold">Recent Transaction</h3>
        <Button variant="link">See All</Button>
      </div>
      <div className="divide-y">
        {transactions.map((transaction) => {
          const Icon = iconMap['spotify']
          const bgColor = colorMap['spotify']
          
          return (
            <div key={transaction.id} className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${bgColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium">{transaction.title}</h4>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-gray-500">{transaction.category}</p>
                  <p className="text-sm text-gray-500">{transaction.subCategory}</p>
                </div>
                <p className="text-red-500 font-medium">{`-Rs.${transaction.amount.toLocaleString()}`}</p>
                <Button variant="outline" size="sm">View Bill</Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

