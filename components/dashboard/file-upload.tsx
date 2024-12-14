'use client'
import { useState } from 'react'
import { Upload, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MultiStepUpload } from './multi-step-upload'

export function FileUpload() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-2 border-dashed rounded-xl p-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-2">
          <Upload className="w-8 h-8 text-gray-400" />
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold">Drag and Drop here</h3>
        <p className="text-gray-500">Images or Documents</p>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Select file
        </Button>
      </div>
      <MultiStepUpload isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

