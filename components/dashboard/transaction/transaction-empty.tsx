import { FileX2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TransactionListEmptyProps {
  onAddTransaction?: () => void
}

export function TransactionListEmpty({ onAddTransaction }: TransactionListEmptyProps) {
  return (
    <div className="rounded-xl border bg-gray-50 p-6 text-center shadow-sm">
      <FileX2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-700 mb-2">No Transactions Found</h3>
      <p className="text-sm text-gray-500 mb-4">
        It looks like you haven't added any transactions yet. Start by adding your first transaction.
      </p>
      {onAddTransaction && (
        <Button
          onClick={onAddTransaction}
          variant="outline"
          className="bg-white text-gray-600 hover:bg-gray-100 border-gray-200"
        >
          Add Transaction
        </Button>
      )}
    </div>
  )
}

