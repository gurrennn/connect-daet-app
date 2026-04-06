'use client'

import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts'
import { Card, CardContent, CardHeader } from '../../../components/ui/Card'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

interface VisitorSpendingChartProps {
  data: Array<{ month: string; spending: number }>
}

export const VisitorSpendingChart: React.FC<VisitorSpendingChartProps> = ({ data }) => (
  <Card>
    <CardHeader>
      <h3 className="text-lg font-semibold text-gray-800">Visitor Spending Trends</h3>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `₱${(value / 1000000).toFixed(1)}M`} />
          <Tooltip 
            formatter={(value: number) => [`₱${value.toLocaleString()}`, 'Spending']}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="spending" 
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={{ fill: '#3B82F6', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
)

interface FootTrafficChartProps {
  data: Array<{ date: string; visitors: number }>
}

export const FootTrafficChart: React.FC<FootTrafficChartProps> = ({ data }) => (
  <Card>
    <CardHeader>
      <h3 className="text-lg font-semibold text-gray-800">Daily Foot Traffic</h3>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => [value.toLocaleString(), 'Visitors']}
            labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
          />
          <Legend />
          <Bar dataKey="visitors" fill="#10B981" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
)

interface RewardsChartProps {
  data: Array<{ week: string; rewards_claimed: number }>
}

export const RewardsChart: React.FC<RewardsChartProps> = ({ data }) => (
  <Card>
    <CardHeader>
      <h3 className="text-lg font-semibold text-gray-800">Rewards Claimed per Week</h3>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => [value, 'Rewards']}
            labelFormatter={(label) => label}
          />
          <Legend />
          <Bar dataKey="rewards_claimed" fill="#8B5CF6" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
)

interface SentimentChartProps {
  data: { positive: number; neutral: number; negative: number }
}

export const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Positive', value: data.positive, color: '#10B981' },
    { name: 'Neutral', value: data.neutral, color: '#F59E0B' },
    { name: 'Negative', value: data.negative, color: '#EF4444' }
  ]

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-800">Visitor Sentiment Analysis</h3>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface DemographicsChartProps {
  data: Array<{ age_group: string; count: number }>
}

export const DemographicsChart: React.FC<DemographicsChartProps> = ({ data }) => (
  <Card>
    <CardHeader>
      <h3 className="text-lg font-semibold text-gray-800">Visitor Demographics</h3>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="age_group" type="category" />
          <Tooltip 
            formatter={(value: number) => [value.toLocaleString(), 'Visitors']}
            labelFormatter={(label) => `Age: ${label}`}
          />
          <Legend />
          <Bar dataKey="count" fill="#F59E0B" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
)

interface ResourceUsageChartProps {
  data: Array<{ facility: string; usage: number }>
}

export const ResourceUsageChart: React.FC<ResourceUsageChartProps> = ({ data }) => (
  <Card>
    <CardHeader>
      <h3 className="text-lg font-semibold text-gray-800">Resource Utilization</h3>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="facility" />
          <YAxis domain={[0, 100]} />
          <Tooltip 
            formatter={(value: number) => [`${value}%`, 'Usage']}
            labelFormatter={(label) => `Facility: ${label}`}
          />
          <Legend />
          <Bar dataKey="usage" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
)
