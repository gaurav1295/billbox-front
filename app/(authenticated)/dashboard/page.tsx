/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpenseCard } from "@/components/dashboard/expense-card";
import { ExpenseStatistics } from "@/components/dashboard/expense-statistics";
import { FileUpload } from "@/components/dashboard/file-upload";
import { FloatingUploadButton } from "@/components/dashboard/floating-upload-button";
import { Header } from "@/components/dashboard/header";
import { MonthlyActivity } from "@/components/dashboard/statistics";
import { TransactionsList } from "@/components/dashboard/transaction-list";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchDashboardData, getBillMonthlySumamry, getLatestBillList } from "@/lib/billClient";
import { Suspense } from "react";

async function ExpenseCards() {
  const data = await getBillMonthlySumamry("bill_date", 8, 2024);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <ExpenseCard {...data.currentMonthSummary} />
      <ExpenseCard {...data.lastMonthSummary}isPending={true}  />
      <div className="hidden md:block">
        <FileUpload />
      </div>
    </div>
  );
}

async function Transactions() {
  const data = await getLatestBillList()
  return <TransactionsList transactions={data} />;
}

async function MonthlyActivityChart() {
  const data = await fetchDashboardData();
  return <MonthlyActivity data={data.monthlyActivity} />;
}

async function ExpenseStatsChart() {
  // const data:any = await fetchDashboardData()
  return <ExpenseStatistics />;
}

function ExpenseCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-40" />
      ))}
    </div>
  );
}

function TransactionsListSkeleton() {
  return <Skeleton className="h-96" />;
}

function ChartSkeleton() {
  return <Skeleton className="h-80" />;
}

export default async function Dashboard() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <Suspense fallback={<ExpenseCardsSkeleton />}>
              <ExpenseCards />
            </Suspense>

            <Suspense fallback={<TransactionsListSkeleton />}>
              <Transactions />
            </Suspense>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Suspense fallback={<ChartSkeleton />}>
                <MonthlyActivityChart />
              </Suspense>
              <Suspense fallback={<ChartSkeleton />}>
                <ExpenseStatsChart />
              </Suspense>
            </div>
          </div>
        </main>
        <FloatingUploadButton />
      </div>
    </div>
  );
}
