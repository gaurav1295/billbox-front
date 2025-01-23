import { auth } from "@clerk/nextjs/server";
import axiosApiClient from "./apiClient";
import { TrackingData } from "@/types/extract";

export type BillFetchCriteria = "bill_date" | "created_date";

type MonthlyValues = {
  month: string;
  year: number;
  total: number;
  reimbursement: number;
  taxSaving: number;
};

export type BillMonthlySummary = {
  currentMonthSummary: MonthlyValues;
  lastMonthSummary: MonthlyValues;
};

export type BillListMeta = {
  id: string; // Unique identifier for the bill
  icon: string; // Icon reference (e.g., "spotify")
  title: string; // Title/description of the bill
  date: string; // Bill date in 'DD MMM YYYY' format
  timestamp: string; // Timestamp for when the bill was uploaded or recorded
  documentId: string; // Unique document ID (e.g., "#12548796")
  documentType: string; // Type of document upload (e.g., "PDF Upload", "Image Upload")
  category: string; // Main category (e.g., "Tax Saving", "Reimburse")
  subCategory: string; // Sub-category of the bill (e.g., "Books & Periodicals")
  amount: number; // Amount associated with the bill
  tracking: TrackingData
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getBillMonthlySumamry = async (
  criteria: BillFetchCriteria,
  month: number,
  year: number
): Promise<BillMonthlySummary> => {
  const filterString = new URLSearchParams({
    criteria,
    month: month.toString(),
    year: year.toString(),
  }).toString();

  const url = `/api/bill/monthly-summary?${filterString}`;

  const { data } = await axiosApiClient.get(url);

  return data;
};

export const getLatestBillList = async (): Promise<{bills: Array<BillListMeta>}> => {

  const url = `/api/bill/latest-bill-list`;
  
  const { data } = await axiosApiClient.get(url);

  return data;
};


// Simulating API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchDashboardData() {
  // Simulate API call delay
  await delay(1500);

  return {
    expenses: [
      {
        month: "November",
        year: 2024,
        total: 15756,
        reimbursement: 5750,
        taxSaving: 10000,
      },
      {
        month: "October",
        year: 2024,
        total: 10075,
        reimbursement: 2075,
        taxSaving: 8000,
        isPending: true,
      },
    ],
    transactions: [
      {
        id: "1",
        icon: "spotify",
        title: "Spotify Subscription",
        date: "25 Nov 2021",
        timestamp: "06 Dec, 12.30 AM",
        documentId: "#12548796",
        documentType: "PDF Upload",
        category: "Tax Saving",
        subCategory: "Books & Periodicals",
        amount: 2500,
      },
      {
        id: "2",
        icon: "fuel",
        title: "Fuel Bill",
        date: "24 Nov 2021",
        timestamp: "05 Dec, 10.15 AM",
        documentId: "#12548797",
        documentType: "Image Upload",
        category: "Tax Saving",
        subCategory: "Fuel & Car Maintenance",
        amount: 4500,
      },
      {
        id: "3",
        icon: "travel",
        title: "Ola Cab to BLR Airport",
        date: "23 Nov 2021",
        timestamp: "03 Dec, 2.30 PM",
        documentId: "#12548798",
        documentType: "PDF WhatsApp",
        category: "Reimburse",
        subCategory: "Business Travel",
        amount: 1500,
      },
    ],
    monthlyActivity: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Reimbursement",
          data: [400, 300, 200, 300, 200, 400],
          color: "rgba(37, 99, 235, 1)",
        },
        {
          label: "Annual Tax",
          data: [200, 150, 100, 200, 100, 300],
          color: "rgba(74, 222, 128, 1)",
        },
      ],
    },
    expenseStats: {
      labels: ["Others", "Investment", "Entertainment", "Bill Expense"],
      datasets: [
        {
          data: [35, 20, 30, 15],
          backgroundColor: [
            "rgba(37, 99, 235, 1)",
            "rgba(74, 222, 128, 1)",
            "rgba(251, 113, 133, 1)",
            "rgba(250, 204, 21, 1)",
          ],
        },
      ],
    },
  };
}
