"use client"
import { BillListMeta, getLatestBillList } from "@/lib/billClient"
import useSWR from "swr"

export function useTransactions() {
  const { data, error, isLoading, mutate } = useSWR<BillListMeta[]>(
      "/api/bill/latest-bill-list",
      async () => {
          try {
              const response = await getLatestBillList();
              return response.bills;
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

