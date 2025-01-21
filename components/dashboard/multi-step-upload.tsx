"use client";
import { useState, useCallback, useEffect } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ReceiptDetails } from "./reciept-details";
import { createBillingTask, getTaskTrackingInfo } from "@/lib/extractClient";
import { TrackingData } from "@/types/extract";

type UploadStep =
  | "idle"
  | "selected"
  | "uploading"
  | "processing"
  | "completed";

interface UploadedFile {
  name: string;
  size: string;
  type: string;
  file: File;
}

interface MultiStepUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MultiStepUpload({ isOpen, onClose }: MultiStepUploadProps) {
  const [uploadStep, setUploadStep] = useState<UploadStep>("idle");
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [taskId, setTaskId] = useState<string|null>(null)

  const { toast } = useToast();

  const handleFile = useCallback((file: File) => {
    setSelectedFile({
      name: file.name,
      size: `${(file.size / 1024).toFixed(0)}kb`,
      type: file.type,
      file: file,
    });
    setUploadStep("selected");
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploadStep("uploading");
    setTrackingData(null);

    try {
      const response = await createBillingTask(selectedFile.file);
      setTaskId(response.taskId)
      setTrackingData(response.trackingData);
      setUploadStep("processing");
      toast({
        title: "File Processing successfully",
      });
    } catch (error) {
      // console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description:
          error instanceof Error
            ? error.message
            : "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
      resetUpload();
    }
  };

  const resetUpload = () => {
    setUploadStep("idle");
    setSelectedFile(null);
    setTrackingData(null);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (uploadStep === "processing") {
      const fetchTrackingData = async () => {
        try {
          if (!taskId) throw 'No Task Found'
          const response = await getTaskTrackingInfo(taskId)
          console.log(response)
          // setTrackingData(response);

          // if (response.progress.percentageComplete === 100) {
          //   setUploadStep("completed");
          //   clearInterval(intervalId);
          // }
        } catch (error) {
          console.error("Error fetching tracking data:", error);
          toast({
            title: "Error",
            description: "Failed to fetch tracking data. Please try again.",
            variant: "destructive",
          });
          clearInterval(intervalId);
        }
      };

      fetchTrackingData(); // Fetch immediately
      intervalId = setInterval(fetchTrackingData, 2000); // Then every 2 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [uploadStep, toast]);

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <Upload className="h-5 w-5" />;
    } else {
      return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
          resetUpload();
        }
      }}
    >
      <DialogContent
        className={`${
          uploadStep === "completed" ? "sm:max-w-xl" : "sm:max-w-md"
        } p-0`}
      >
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>
            {uploadStep === "completed" ? "Receipt Details" : "Media Upload"}
          </DialogTitle>
        </DialogHeader>
        <div className={`${uploadStep === "completed" ? "" : "p-6"}`}>
          {uploadStep !== "completed" && (
            <div className="text-sm text-muted-foreground mb-4">
              Add your documents or images here, and you can upload up to 5
              files max
            </div>
          )}

          {uploadStep === "idle" && (
            <div
              className={`border-2 ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-dashed"
              } rounded-lg p-6 text-center space-y-4 transition-colors duration-300`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center gap-2">
                <Upload
                  className={`h-8 w-8 ${
                    isDragging ? "text-blue-500" : "text-gray-400"
                  }`}
                />
                <div className="flex gap-1">
                  <span>
                    {isDragging
                      ? "Drop your file here"
                      : "Drag your file(s) or"}
                  </span>
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

          {uploadStep === "selected" && selectedFile && (
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getFileIcon(selectedFile.type)}
                  <div>
                    <div className="font-medium">{selectedFile.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedFile.size}
                    </div>
                  </div>
                </div>
                <Button onClick={handleUpload}>Upload</Button>
              </div>
            </div>
          )}

          {uploadStep === "uploading" && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <p className="text-sm font-medium">Uploading file...</p>
            </div>
          )}

          {uploadStep === "processing" && trackingData && (
            <div className="space-y-4">
              <Progress
                value={trackingData.progress.percentageComplete}
                className="w-full"
              />
              <div className="text-sm font-medium">
                {trackingData.currentStage.split("_").join(" ")} (
                {trackingData.progress.percentageComplete}%)
              </div>
              <div className="space-y-2">
                {Object.entries(trackingData.stages).map(([stage, data]) => (
                  <div key={stage} className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${getStatusColor(
                        data.status
                      )}`}
                    />
                    <span className="capitalize">
                      {stage.split(/(?=[A-Z])/).join(" ")}
                    </span>
                    {data.status === 'IN_PROGRESS' && (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* {uploadStep === "completed" &&
            selectedFile && (
              <ReceiptDetails
                receiptData={{
                  ...trackingData.receiptDetails,
                  file: selectedFile.file,
                }}
              />
            )} */}

          {uploadStep !== "completed" && (
            <>
              <div className="text-xs text-muted-foreground mt-4">
                Supported file types: Images (.jpg, .jpeg, .png, .svg, .gif) and
                Documents (.pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx)
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getStatusColor(status: string): string {
  switch (status) {
    case "completed":
      return "bg-green-500";
    case "in_progress":
      return "bg-blue-500";
    case "pending":
      return "bg-gray-300";
    default:
      return "bg-gray-300";
  }
}
