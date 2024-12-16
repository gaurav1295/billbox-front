import { Users, Briefcase, PiggyBank, BarChart3 } from 'lucide-react'

interface BillsStatsProps {
  useUploadDate: boolean
}

export function BillsStats({ useUploadDate }: BillsStatsProps) {
  const stats = [
    {
      title: 'Total Expenses',
      value: 'Rs. 2,01,100',
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Reimburse Expenses',
      value: 'Rs. 50,250',
      icon: Briefcase,
      color: 'yellow',
    },
    {
      title: 'Tax Saving Expenses',
      value: 'Rs. 1,40,000',
      icon: PiggyBank,
      color: 'pink',
    },
    {
      title: 'Other Expenses',
      value: 'Rs. 10,850',
      icon: BarChart3,
      color: 'purple',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div 
            key={stat.title} 
            className={`rounded-xl bg-white p-6 shadow-sm border-2 border-${stat.color}-200 transition-all duration-300 hover:border-${stat.color}-300 hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
              </div>
              <div className={`rounded-full p-3 bg-${stat.color}-100`}>
                <Icon className={`h-6 w-6 text-${stat.color}-500`} />
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Based on {useUploadDate ? 'upload' : 'bill'} date
            </p>
          </div>
        )
      })}
    </div>
  )
}

