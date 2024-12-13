/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarChart } from './bar-chart'
import { PieChart } from './pie-chart'

export function MonthlyActivity({ data }: { data: any }) {
  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Monthly Activity</h3>
      <BarChart data={data} />
    </div>
  )
}

export function ExpenseStatistics({ data }: { data: any }) {
  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Expense Statistics</h3>
      <PieChart data={data} />
    </div>
  )
}

