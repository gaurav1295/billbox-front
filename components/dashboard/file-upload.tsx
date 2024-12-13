import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FileUpload() {
  return (
    <div className="border-2 border-dashed rounded-xl p-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <Upload className="w-8 h-8 text-gray-400" />
        <h3 className="text-lg font-semibold">Drag and Drop here</h3>
        <p className="text-gray-500">Or</p>
        <Button variant="outline">Select file</Button>
      </div>
    </div>
  )
}

