import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { BillListMeta } from "@/lib/billClient"
import { ScrollArea } from "@/components/ui/scroll-area"

interface BillDetailsDialogProps {
  bill: BillListMeta | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BillDetailsDialog({ bill, open, onOpenChange }: BillDetailsDialogProps) {
  if (!bill) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Bill Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[600px] pr-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="font-medium">Transaction Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Title</p>
                  <p className="font-medium">{bill.title}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Amount</p>
                  <p className="font-medium text-red-500">-Rs.{bill.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Category</p>
                  <p className="font-medium">{bill.category}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">{bill.date}</p>
                </div>
              </div>
            </div>
            {/* Add more bill details sections as needed */}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

