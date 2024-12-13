import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Wallet, User } from 'lucide-react'

const transactions = [
  { icon: CreditCard, name: 'Deposit from my Card', date: '28 January 2021', amount: -850, color: 'bg-orange-100' },
  { icon: Wallet, name: 'Deposit Paypal', date: '25 January 2021', amount: 2500, color: 'bg-blue-100' },
  { icon: User, name: 'Jemi Wilson', date: '21 January 2021', amount: 5400, color: 'bg-green-100' },
]

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Recent Transaction</CardTitle>
        <Badge variant="outline" className="font-normal">See All</Badge>
      </CardHeader>
      <CardContent>
        {transactions.map((transaction, index) => (
          <div key={index} className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <div className={`p-2 rounded-full ${transaction.color} mr-3`}>
                <transaction.icon className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <div className="font-medium">{transaction.name}</div>
                <div className="text-sm text-gray-500">{transaction.date}</div>
              </div>
            </div>
            <div className={`font-medium ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
              {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toLocaleString()}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

