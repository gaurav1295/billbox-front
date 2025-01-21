import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

interface TrackingStage {
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED"
  startTime?: string
  endTime?: string
  duration?: number
}

interface TrackingData {
  taskId: string
  currentStage: string
  stages: {
    fileUpload: TrackingStage
    textDetection: TrackingStage
    openAIProcessing: TrackingStage
    databaseEntry: TrackingStage
  }
  progress: {
    currentStep: number
    totalSteps: number
    percentageComplete: number
  }
  error?: {
    stage: string
    message: string
    timestamp: string
  }
  metadata?: {
    startTime: string
    lastUpdated: string
  }
}

interface TrackingComponentProps {
  taskId: string
  onProgressUpdate: (progress: number) => void
  onComplete: () => void
}

export function TrackingComponent({ taskId, onProgressUpdate, onComplete }: TrackingComponentProps) {
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)

  useEffect(() => {
    const fetchTrackingData = async () => {
      // In a real application, this would be an API call
      const response = await mockTrackingAPI(taskId)
      setTrackingData(response)
      onProgressUpdate(response.progress.percentageComplete)

      if (response.progress.percentageComplete === 100) {
        onComplete()
      }
    }

    const interval = setInterval(fetchTrackingData, 2000) // Poll every 2 seconds

    return () => clearInterval(interval)
  }, [taskId, onProgressUpdate, onComplete])

  if (!trackingData) {
    return <div>Loading...</div>
  }

  const stageOrder = ["fileUpload", "textDetection", "openAIProcessing", "databaseEntry"]

  return (
    <div className="space-y-4">
      <Progress value={trackingData.progress.percentageComplete} className="w-full" />
      <div className="space-y-2">
        {stageOrder.map((stage) => (
          <div key={stage} className="flex items-center space-x-2">
            {getStageIcon(trackingData.stages[stage as keyof typeof trackingData.stages].status)}
            <span className="flex-1">{formatStageName(stage)}</span>
            <span className="text-sm text-gray-500">
              {formatDuration(trackingData.stages[stage as keyof typeof trackingData.stages].duration)}
            </span>
          </div>
        ))}
      </div>
      {trackingData.error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          <p className="font-semibold">Error in {formatStageName(trackingData.error.stage)}:</p>
          <p>{trackingData.error.message}</p>
        </div>
      )}
    </div>
  )
}

function getStageIcon(status: TrackingStage["status"]) {
  switch (status) {
    case "COMPLETED":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />
    case "FAILED":
      return <XCircle className="w-5 h-5 text-red-500" />
    case "IN_PROGRESS":
      return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
    default:
      return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
  }
}

function formatStageName(stage: string): string {
  return stage.split(/(?=[A-Z])/).join(" ")
}

function formatDuration(duration?: number): string {
  if (!duration) return ""
  return `${(duration / 1000).toFixed(1)}s`
}

// Mock API function
async function mockTrackingAPI(taskId: string): Promise<TrackingData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Generate a random progress between 0 and 100
  const progress = Math.min(Math.floor(Math.random() * 101), 100)

  // Determine the current stage based on progress
  let currentStage: string
  let stages: TrackingData["stages"]

  if (progress < 25) {
    currentStage = "FILE_UPLOAD"
    stages = {
      fileUpload: { status: "IN_PROGRESS" },
      textDetection: { status: "PENDING" },
      openAIProcessing: { status: "PENDING" },
      databaseEntry: { status: "PENDING" },
    }
  } else if (progress < 50) {
    currentStage = "TEXT_DETECTION"
    stages = {
      fileUpload: { status: "COMPLETED", duration: 3819 },
      textDetection: { status: "IN_PROGRESS" },
      openAIProcessing: { status: "PENDING" },
      databaseEntry: { status: "PENDING" },
    }
  } else if (progress < 75) {
    currentStage = "OPENAI_PROCESSING"
    stages = {
      fileUpload: { status: "COMPLETED", duration: 3819 },
      textDetection: { status: "COMPLETED", duration: 23325 },
      openAIProcessing: { status: "IN_PROGRESS" },
      databaseEntry: { status: "PENDING" },
    }
  } else {
    currentStage = "DATABASE_ENTRY"
    stages = {
      fileUpload: { status: "COMPLETED", duration: 3819 },
      textDetection: { status: "COMPLETED", duration: 23325 },
      openAIProcessing: { status: "COMPLETED", duration: 5156 },
      databaseEntry: { status: "IN_PROGRESS" },
    }
  }

  // Mock response data
  return {
    taskId: taskId,
    currentStage: currentStage,
    stages: stages,
    progress: {
      currentStep: Math.ceil(progress / 25),
      totalSteps: 4,
      percentageComplete: progress,
    },
    metadata: {
      startTime: new Date(Date.now() - 60000).toISOString(),
      lastUpdated: new Date().toISOString(),
    },
  }
}

