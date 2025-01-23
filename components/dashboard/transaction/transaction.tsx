'use client';

import { useTransactions } from "@/hooks/use-transaction";
import { TransactionsList } from "./transaction-list";
import { TransactionListSkeleton } from "./transaction-skeletion-list";
import { TransactionListEmpty } from "./transaction-empty";

export function Transactions() {
  const { transactions, isLoading, isError } = useTransactions();
  
  if (isLoading) return <TransactionListSkeleton />;
  if (isError) throw new Error("Failed to load transactions");
  if (!transactions?.length) return <TransactionListEmpty />;
  
  return <TransactionsList transactions={transactions} />;
}