'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Sat', deposit: 450, withdraw: 240 },
  { name: 'Sun', deposit: 300, withdraw: 139 },
  { name: 'Mon', deposit: 300, withdraw: 220 },
  { name: 'Tue', deposit: 450, withdraw: 300 },
  { name: 'Wed', deposit: 200, withdraw: 250 },
  { name: 'Thu', deposit: 300, withdraw: 220 },
  { name: 'Fri', deposit: 300, withdraw: 300 },
]

export function MonthlyActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Monthly Activity</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="deposit" fill="#8884d8" radius={[5, 5, 0, 0]} />
            <Bar dataKey="withdraw" fill="#82ca9d" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

