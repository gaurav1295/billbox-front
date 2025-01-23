"use client";
import {
  BillFetchCriteria,
  BillListMeta,
  getBillMonthlySumamry,
  getLatestBillList,
} from "@/lib/billClient";
import useSWR from "swr";

export function useExpenseCard(
  criteria: BillFetchCriteria,
  month: number,
  year: number
) {
  const filterString = new URLSearchParams({
    criteria,
    month: month.toString(),
    year: year.toString(),
  }).toString();
  
  const { data, error, isLoading, mutate } = useSWR<any>(
    `/api/bill/monthly-summary?${filterString}`,
    async () => {
      try {
        const date = new Date();
        const response = await getBillMonthlySumamry(
          "created_date",
          date.getMonth() + 1,
          date.getFullYear()
        );
        return {
          a: response.currentMonthSummary,
          b: response.lastMonthSummary,
        };
      } catch (err) {
        throw err;
      }
    },
    {
      refreshInterval: 3000,
      revalidateOnFocus: true,
    }
  );

  return {
    transactions: data,
    isLoading,
    isError: error,
    mutate,
  };
}
