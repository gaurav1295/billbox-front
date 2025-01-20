interface ExpenseCardProps {
  month: string
  year: number
  total: number
  reimbursement: number
  taxSaving: number
  isPending?: boolean
}

export function ExpenseCard({
  month,
  year,
  total,
  reimbursement,
  taxSaving,
  isPending = false,
}: ExpenseCardProps) {
  if (!month) {
    return <div>not found</div>
  }
  return (
    <div className={`rounded-xl p-4 md:p-6 ${isPending ? 'bg-white border' : 'bg-blue-600 text-white'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">{`${month} ${year}`}</h3>
          <p className="text-2xl font-bold mt-2">{`Rs.${total.toLocaleString()}`}</p>
        </div>
        {isPending && (
          <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm">
            Pending
          </span>
        )}
      </div>
      <div className="mt-4 space-y-2">
        <div>
          <p className={`text-sm ${isPending ? 'text-gray-500' : 'text-blue-200'}`}>
            REIMBURSEMENT
          </p>
          <p className="font-medium">{`Rs.${reimbursement.toLocaleString()}`}</p>
        </div>
        <div>
          <p className={`text-sm ${isPending ? 'text-gray-500' : 'text-blue-200'}`}>
            TAX SAVING
          </p>
          <p className="font-medium">{`Rs.${taxSaving.toLocaleString()}`}</p>
        </div>
      </div>
    </div>
  )
}

