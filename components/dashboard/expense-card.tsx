import { Card, CardContent } from "@/components/ui/card"

interface ExpenseCardProps {
  month: string
  year: number
  total: number
  reimbursement: number
  taxSaving: number
  isActive?: boolean
}

export function ExpenseCard({ month, year, total, reimbursement, taxSaving, isActive = false }: ExpenseCardProps) {
  return (
    <Card className={`w-64 ${isActive ? 'bg-blue-600 text-white' : 'bg-white'}`}>
      <CardContent className="p-6">
        <div className="text-lg font-semibold mb-4">{month} {year}</div>
        <div className="text-3xl font-bold mb-4">${total.toLocaleString()}</div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="uppercase">Reimbursement</span>
            <span>${reimbursement.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="uppercase">Tax Saving</span>
            <span>${taxSaving.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

