import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Bell, Download, Send } from 'lucide-react'
import Image from 'next/image'

const quickLinks = [
  { icon: Upload, label: 'Upload Bill' },
  { icon: Bell, label: 'Activate Reminder' },
  { icon: Download, label: 'Download Report' },
]

export function QuickLinks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-6">
          {quickLinks.map((link, index) => (
            <div key={index} className="text-center">
              <div className="mb-2">
                <Image
                  src={`/placeholder.svg?height=60&width=60`}
                  alt={link.label}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
              <div className="text-sm">{link.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
          <div>
            <div className="text-sm font-semibold">Spread the Love.</div>
            <div className="text-xs text-gray-500">Referral Code: BillBoxKS50</div>
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Send <Send className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

