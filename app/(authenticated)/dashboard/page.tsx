/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpenseCard } from "@/components/dashboard/expense-card";
import { ExpenseStatistics } from "@/components/dashboard/expense-statistics";
import { FileUpload } from "@/components/dashboard/file-upload";
import { FloatingUploadButton } from "@/components/dashboard/floating-upload-button";
import { Header } from "@/components/dashboard/header";
import { MonthlyActivity } from "@/components/dashboard/statistics";
import { TransactionsList } from "@/components/dashboard/transaction-list";
import { ErrorBoundary } from "@/components/ErrorBoundry";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchDashboardData, getBillMonthlySumamry, getLatestBillList } from "@/lib/billClient";
import { Suspense } from "react";

async function ExpenseCards() {
  try {
    const date = new Date()
    const data = await getBillMonthlySumamry("bill_date", date.getMonth() + 1, date.getFullYear());
    console.log(data)
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <ExpenseCard {...data.currentMonthSummary} />
        <ExpenseCard {...data.lastMonthSummary} isPending={true} />
        <div className="hidden md:block">
          <FileUpload />
        </div>
      </div>
    );
  } catch (error) {
    throw new Error("Failed to load expense summary");
  }
}

async function Transactions() {
  try {
    const data = await getLatestBillList();

    return <TransactionsList transactions={data.bills} />;
  } catch (error) {
    throw new Error("Failed to load transactions");
  }
}

async function MonthlyActivityChart() {
  try {
    const data = await fetchDashboardData();
    return <MonthlyActivity data={data.monthlyActivity} />;
  } catch (error) {
    throw new Error("Failed to load monthly activity data");
  }
}

async function ExpenseStatsChart() {
  try {
    // const data:any = await fetchDashboardData()
    return <ExpenseStatistics />;
  } catch (error) {
    throw new Error("Failed to load expense statistics");
  }
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
            <ErrorBoundary>
              <Suspense fallback={<ExpenseCardsSkeleton />}>
                <ExpenseCards />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<TransactionsListSkeleton />}>
                <Transactions />
              </Suspense>
            </ErrorBoundary>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ErrorBoundary>
                <Suspense fallback={<ChartSkeleton />}>
                  <MonthlyActivityChart />
                </Suspense>
              </ErrorBoundary>
              <ErrorBoundary>
                <Suspense fallback={<ChartSkeleton />}>
                  <ExpenseStatsChart />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </main>
        <FloatingUploadButton />
      </div>
    </div>
  );
}