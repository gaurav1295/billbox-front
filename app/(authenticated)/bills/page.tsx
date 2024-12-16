'use client'

import { useState } from 'react'
// import { Search, Settings, Bell } from 'lucide-react'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { BillsStats } from './bills-stats'
import { BillsTable } from './bills-table'
import { Header } from '@/components/dashboard/header'

export default function BillsPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchQuery, setSearchQuery] = useState('')
  const [useUploadDate, setUseUploadDate] = useState(false)

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
      <Header />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="use-upload-date"
          checked={useUploadDate}
          onCheckedChange={setUseUploadDate}
        />
        <Label htmlFor="use-upload-date">
          {useUploadDate ? 'Using Upload Date' : 'Using Bill Date'}
        </Label>
      </div>
      <BillsStats useUploadDate={useUploadDate} />
      <BillsTable searchQuery={searchQuery} useUploadDate={useUploadDate} />
    </div>
  )
}

