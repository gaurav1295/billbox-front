import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X } from 'lucide-react'

interface ReceiptDetailsProps {
  receiptData: {
    merchantName: string
    expenseDate: string
    total: number
    tax: number
    invoiceNo: string
    file: File
  }
}

export function ReceiptDetails({ receiptData }: ReceiptDetailsProps) {
  const [isImageExpanded, setIsImageExpanded] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (receiptData.file) {
      const url = URL.createObjectURL(receiptData.file)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [receiptData.file])

  return (
    <div className="flex flex-col h-[80vh]">
      <div className="relative">
        <div 
          className={`transition-all duration-300 ease-in-out ${
            isImageExpanded ? 'h-full fixed inset-0 z-50 bg-black' : 'h-40 overflow-hidden'
          }`}
          onClick={() => !isImageExpanded && setIsImageExpanded(true)}
        >
          {previewUrl && (
            receiptData.file.type.startsWith('image/') ? (
              <img
                src={previewUrl}
                alt="Receipt"
                className={`w-full h-full object-contain ${
                  isImageExpanded ? 'cursor-default' : 'cursor-pointer'
                }`}
              />
            ) : (
              <iframe
                src={previewUrl}
                title="Document Preview"
                className="w-full h-full"
              />
            )
          )}
          {isImageExpanded && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation()
                setIsImageExpanded(false)
              }}
            >
              <X className="h-6 w-6" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex-grow overflow-y-auto px-4 py-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="merchant">Merchant</Label>
            <Input id="merchant" defaultValue={receiptData.merchantName} className="bg-white" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expenseDate">Expense Date</Label>
            <Input id="expenseDate" type="date" defaultValue={receiptData.expenseDate} className="bg-white" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="total">Total</Label>
              <Input id="total" defaultValue={`₦${receiptData.total.toLocaleString()}`} className="bg-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax">Tax</Label>
              <Input id="tax" defaultValue={`₦${receiptData.tax.toLocaleString()}`} className="bg-white" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="invoiceNo">Invoice No.</Label>
            <Input id="invoiceNo" defaultValue={receiptData.invoiceNo} className="bg-white" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select defaultValue="meal">
              <SelectTrigger id="category" className="bg-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meal">Meal & Entertainment</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
                <SelectItem value="accommodation">Accommodation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Method of Payment</Label>
            <Select defaultValue="card">
              <SelectTrigger id="paymentMethod" className="bg-white">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Add any additional notes here..." className="bg-white" />
          </div>

          <div className="space-y-2">
            <Label>Mark For</Label>
            <div className="flex gap-2">
              <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white">
                Reimburse
              </Button>
              <Button variant="outline" className="flex-1">
                Tax Saving
              </Button>
            </div>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Save Receipt
          </Button>
        </div>
      </div>
    </div>
  )
}

