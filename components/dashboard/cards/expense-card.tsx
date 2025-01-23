'use client';

import { useExpenseCard } from "@/hooks/useExpenseCard";
import { FileUpload } from "../file-upload";

export function ExpenseCard() {
  const { transactions, isLoading, isError } = useExpenseCard('created_date', 1, 2025);
  
  if (isLoading) return 'No Data'
  if (isError) throw new Error("Failed to load expense card");
  if (!transactions?.length) return 'No data Found';
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <ExpenseCard {...transactions.currentMonthSummary} />
      <ExpenseCard {...transactions.lastMonthSummary} isPending={true} />
      <div className="hidden md:block">
        <FileUpload />
      </div>
    </div>
  )
}