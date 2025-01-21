import axiosApiClient from "./apiClient";
import { TrackingData } from "@/types/extract";

type TaskCreationResponseData = {
  requestId: string;
  status: string;
  statusUrl: string;
  trackingData: TrackingData;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createBillingTask = async (
  file: File
): Promise<TaskCreationResponseData> => {
  const url = `api/extract/extract-text-queue`;

  const formData = new FormData();

  formData.append("file", file);

  const { data } = await axiosApiClient.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const getTaskTrackingInfo = async (
    taskId: string
  ): Promise<TrackingData> => {
  
    const url = `api/extract/status/:${taskId}`;
  
    const { data } = await axiosApiClient.get(url);
  
    return data;
  };
