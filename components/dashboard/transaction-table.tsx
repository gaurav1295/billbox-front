import { ArrowDown, ArrowUp } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Transaction {
  id: string
  description: string
  billNumber: string
  type: string
  billDate: string
  uploadDate: string
  amount: number
}

const transactions: Transaction[] = [
  {
    id: "1",
    description: "Spotify Subscription",
    billNumber: "#12548796",
    type: "Personal",
    billDate: "28 Jan, 12.30 AM",
    uploadDate: "28 Jan, 12.30 AM",
    amount: -2500
  },
  {
    id: "2",
    description: "Freepik Sales",
    billNumber: "#12548796",
    type: "Reimburse",
    billDate: "25 Jan, 10.40 PM",
    uploadDate: "25 Jan, 10.40 PM",
    amount: 750
  },
  {
    id: "3",
    description: "Mobile Service",
    billNumber: "#12548796",
    type: "Reimburse",
    billDate: "20 Jan, 10.40 PM",
    uploadDate: "20 Jan, 10.40 PM",
    amount: -150
  },
  {
    id: "4",
    description: "Wilson",
    billNumber: "#12548796",
    type: "Tax Saving",
    billDate: "15 Jan, 03.29 PM",
    uploadDate: "15 Jan, 03.29 PM",
    amount: -1050
  },
  {
    id: "5",
    description: "Emilly",
    billNumber: "#12548796",
    type: "Tax Saving",
    billDate: "14 Jan, 10.40 PM",
    uploadDate: "14 Jan, 10.40 PM",
    amount: 840
  }
]

export function TransactionTable() {
  return (
    <div className="w-full">
      <div className="flex space-x-8 mb-6 border-b">
        <button className="text-blue-600 border-b-2 border-blue-600 pb-2">All Bills</button>
        <button className="text-gray-500 pb-2">Reimburse</button>
        <button className="text-gray-500 pb-2">Tax Saving Expense</button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-gray-500">
            <th className="text-left pb-4">Description</th>
            <th className="text-left pb-4">Bill Number</th>
            <th className="text-left pb-4">Type</th>
            <th className="text-left pb-4">Bill Date</th>
            <th className="text-left pb-4">Upload Date</th>
            <th className="text-right pb-4">Amount</th>
            <th className="text-right pb-4">Receipt</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b">
              <td className="py-4">
                <div className="flex items-center">
                  {transaction.amount > 0 ? (
                    <ArrowDown className="w-4 h-4 text-green-500 mr-2" />
                  ) : (
                    <ArrowUp className="w-4 h-4 text-red-500 mr-2" />
                  )}
                  {transaction.description}
                </div>
              </td>
              <td className="py-4">{transaction.billNumber}</td>
              <td className="py-4">{transaction.type}</td>
              <td className="py-4">{transaction.billDate}</td>
              <td className="py-4">{transaction.uploadDate}</td>
              <td className={`py-4 text-right ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()}
              </td>
              <td className="py-4 text-right">
                <Button variant="outline" size="sm">View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-6">
        <Button variant="outline" size="sm">Previous</Button>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">4</Button>
        </div>
        <Button variant="outline" size="sm">Next</Button>
      </div>
    </div>
  )
}

