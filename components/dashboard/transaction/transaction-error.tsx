import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

// interface TransactionListErrorProps {
//   onRetry: () => void
// }

export function TransactionListError() {
  return (
    <div className="rounded-xl border bg-red-50 p-6 text-center shadow-sm">
      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Transactions</h3>
      <p className="text-sm text-red-600 mb-4">
        We encountered an issue while fetching your transactions. Please try again.
      </p>
      <Button variant="outline" className="bg-white text-red-600 hover:bg-red-50 border-red-200">
        Retry
      </Button>
    </div>
  )
}

