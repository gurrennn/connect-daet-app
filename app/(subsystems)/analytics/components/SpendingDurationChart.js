'use client'

import { Card, CardContent, CardHeader } from '../../../components/ui/Card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export const SpendingDurationChart = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-800">Tourist Spending by Duration</h3>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="duration" />
            <YAxis />
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Legend />
            <Bar dataKey="average_spending" fill="#3B82F6" name="Average Spending (₱)" />
            <Bar dataKey="total_spending" fill="#10B981" name="Total Spending (₱)" />
            <Bar dataKey="tourist_count" fill="#F59E0B" name="Number of Tourists" />
          </BarChart>
        </ResponsiveContainer>
        
        {/* Summary Statistics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {data.reduce((sum, item) => sum + item.tourist_count, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Tourists</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              ₱{Math.round(data.reduce((sum, item) => sum + item.average_spending, 0) / data.length).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Average Spending</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              ₱{data.reduce((sum, item) => sum + item.total_spending, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SpendingDurationChart
