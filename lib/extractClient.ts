// import { auth } from "@clerk/nextjs/server";
import axiosApiClient, { axiosApiClient1 } from "./apiClient";
import { TrackingData } from "@/types/extract";

type TaskCreationResponseData = {
  taskId: string;
  status: string;
  statusUrl: string;
  trackingData: TrackingData;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createBillingTask = async (
  file: File
): Promise<TaskCreationResponseData> => {
  // const { getToken } = auth();
  // const token = await getToken();

  const url = `/api/extract`;

  const formData = new FormData();

  formData.append("file", file);

  const { data } = await axiosApiClient1.post(url, formData, {
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const getTaskTrackingInfo = async (
    taskId: string
  ) => {
  
    const url = `/api/extract/${taskId}`;
  
    const { data } = await axiosApiClient1.get(url);
  
    return data;
  };
