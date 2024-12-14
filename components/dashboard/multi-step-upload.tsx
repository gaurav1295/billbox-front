'use client'
import { useState, useCallback } from 'react'
import { Upload, FileText, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { ReceiptDetails } from './reciept-details'

type UploadStep = 1 | 2 | 3 | 4 | 5
// type FileStatus = 'idle' | 'selected' | 'uploading' | 'completed'

interface UploadedFile {
  name: string
  size: string
  type: string
  file: File
}

interface MultiStepUploadProps {
  isOpen: boolean
  onClose: () => void
}

interface UploadResponse {
  fileId: string
  merchantName: string
  expenseDate: string
  total: number
  tax: number
  invoiceNo: string
}

export function MultiStepUpload({ isOpen, onClose }: MultiStepUploadProps) {
  const [currentStep, setCurrentStep] = useState<UploadStep>(1)
  // const [fileStatus, setFileStatus] = useState<FileStatus>('idle')
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadResponse, setUploadResponse] = useState<UploadResponse | null>(null)
  const { toast } = useToast()

  const handleFile = useCallback((file: File) => {
    setSelectedFile({
      name: file.name,
      size: `${(file.size / 1024).toFixed(0)}kb`,
      type: file.type,
      file: file
    })
    // setFileStatus('selected')
    setCurrentStep(2)
    handleUpload(file)
  }, [])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleUpload = async (file: File) => {
    setCurrentStep(3)
    // setFileStatus('uploading')
    setUploadProgress(0)

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const reader = response.body?.getReader()
      const contentLength = +response.headers.get('Content-Length')!
      let receivedLength = 0

      while(true) {
        const { done, value } = await reader!.read()

        if (done) {
          break
        }

        receivedLength += value.length
        setUploadProgress(Math.round((receivedLength / contentLength) * 100))
      }

      // const data: UploadResponse = await response.json()
      // setFileStatus('completed')
      setCurrentStep(5)
      setUploadResponse({
        fileId: 'asdasda',
        merchantName: 'dadsadad',
        expenseDate: '23232323',
        total: 3232,
        tax: 23232,
        invoiceNo: '23232'
      })

      toast({
        title: 'File uploaded successfully',
        // description: `File ID: ${data.fileId}`,
      })
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading your file. Please try again.',
        variant: 'destructive',
      })
      resetUpload()
    }
  }

  const resetUpload = () => {
    setCurrentStep(1)
    // setFileStatus('idle')
    setSelectedFile(null)
    setUploadProgress(0)
    setUploadResponse(null)
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <Upload className="h-5 w-5" />
    } else {
      return <FileText className="h-5 w-5" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose()
        resetUpload()
      }
    }}>
      <DialogContent className={`${currentStep === 5 ? 'sm:max-w-xl' : 'sm:max-w-md'} p-0 bg-white`}>
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>
            {currentStep === 5 ? 'Receipt Details' : 'Media Upload'}
          </DialogTitle>
        </DialogHeader>
        <div className={`${currentStep === 5 ? '' : 'p-6'}`}>
          {currentStep !== 5 && (
            <div className="text-sm text-muted-foreground mb-4">
              Add your documents or images here, and you can upload up to 5 files max
            </div>
          )}

          {currentStep === 1 && (
            <div 
              className={`border-2 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-dashed'} rounded-lg p-6 text-center space-y-4 transition-colors duration-300`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center gap-2">
                <Upload className={`h-8 w-8 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
                <div className="flex gap-1">
                  <span>{isDragging ? 'Drop your file here' : 'Drag your file(s) or'}</span>
                  {!isDragging && (
                    <label className="text-blue-500 cursor-pointer hover:underline">
                      browse
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect}
                        accept=".jpg,.jpeg,.png,.svg,.gif,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                      />
                    </label>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  Max 10 MB files are allowed
                </span>
              </div>
            </div>
          )}

          {currentStep === 2 && selectedFile && (
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getFileIcon(selectedFile.type)}
                  <div>
                    <div className="font-medium">{selectedFile.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedFile.size}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedFile && getFileIcon(selectedFile.type)}
                    <div>
                      <div className="font-medium">{selectedFile?.name}</div>
                      <div className="text-sm text-muted-foreground">Uploading...</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetUpload}
                  >
                    Cancel
                  </Button>
                </div>
                <Progress value={uploadProgress} className="mt-2" />
              </div>
            </div>)}

          {currentStep === 4 && selectedFile && (
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getFileIcon(selectedFile.type)}
                  <div>
                    <div className="font-medium">{selectedFile.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedFile.size}</div>
                  </div>
                </div>
                <Check className="h-5 w-5 text-green-500" />
              </div>
            </div>
          )}

          {currentStep === 5 && uploadResponse && selectedFile && (
            <ReceiptDetails
              receiptData={{
                ...uploadResponse,
                file: selectedFile.file
              }}
            />
          )}

          {currentStep !== 5 && (
            <>
              <div className="text-xs text-muted-foreground mt-4">
                Supported file types: Images (.jpg, .jpeg, .png, .svg, .gif) and Documents (.pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx)
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex items-center">
                  <span className="text-sm font-medium">Upload from URL</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Add file URL"
                    className="flex-1 rounded-md border px-3 py-2 text-sm"
                  />
                  <Button variant="outline" size="sm">
                    Upload
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

