import { StepStatus, TrackingData } from "@/types/extract"
import { Check, Loader2 } from "lucide-react"

interface TaskProgressProps {
  tracking: TrackingData
}

export function TaskProgress({ tracking }: TaskProgressProps) {
  const stages = Object.entries(tracking.stages)

  return (
    <div className="space-y-2">
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-sky-400 transition-all duration-500 ease-in-out"
          style={{ width: `${tracking.progress.percentageComplete}%` }}
        >
          <div className="w-full h-full opacity-50 bg-stripe"></div>
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        {stages.map(([stage, status]) => {
          const isActive = tracking.currentStage === stage
          const isCompleted = status === "COMPLETED" as unknown as StepStatus

          return (
            <div
              key={stage}
              className={`flex items-center gap-1 ${
                isActive ? "text-sky-600 font-medium" : isCompleted ? "text-emerald-500" : ""
              }`}
            >
              {isCompleted ? (
                <Check className="h-3 w-3" />
              ) : isActive ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : null}
              <span className="capitalize hidden sm:inline">
                {
                  stage
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                    .split(" ")[0]
                }
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

