'use client'

import { Card, CardContent, CardHeader } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'

interface PredictiveAnalyticsProps {
  data: {
    next_week_visitors: {
      predicted: number
      confidence: number
      trend: 'increasing' | 'decreasing' | 'stable'
      change_percent: number
    }
    next_month_revenue: {
      predicted: number
      confidence: number
      trend: 'increasing' | 'decreasing' | 'stable'
      change_percent: number
    }
    resource_strain: {
      predicted: number
      confidence: number
      trend: 'increasing' | 'decreasing' | 'stable'
      warning_level: 'low' | 'moderate' | 'high'
    }
  }
}

export const PredictiveAnalytics: React.FC<PredictiveAnalyticsProps> = ({ data }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return '📈'
      case 'decreasing':
        return '📉'
      default:
        return '➡️'
    }
  }

  const getWarningColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'moderate':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      default:
        return 'text-green-600 bg-green-50 border-green-200'
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Visitor Prediction */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <span className="mr-2">{getTrendIcon(data.next_week_visitors.trend)}</span>
            Next Week Visitors
          </h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {data.next_week_visitors.predicted.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">
                {data.next_week_visitors.change_percent > 0 ? '+' : ''}{data.next_week_visitors.change_percent}% from this week
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Confidence</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${data.next_week_visitors.confidence}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{data.next_week_visitors.confidence}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Prediction */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <span className="mr-2">{getTrendIcon(data.next_month_revenue.trend)}</span>
            Next Month Revenue
          </h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                ₱{(data.next_month_revenue.predicted / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-600">
                {data.next_month_revenue.change_percent > 0 ? '+' : ''}{data.next_month_revenue.change_percent}% from this month
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Confidence</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${data.next_month_revenue.confidence}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{data.next_month_revenue.confidence}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resource Strain Warning */}
      <Card className={`border-l-4 ${getWarningColor(data.resource_strain.warning_level).split(' ')[2]}`}>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <span className="mr-2">⚠️</span>
            Resource Strain
          </h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {data.resource_strain.predicted}%
              </div>
              <div className={`text-sm font-medium ${getWarningColor(data.resource_strain.warning_level).split(' ')[0]} px-2 py-1 rounded-full inline-block`}>
                {data.resource_strain.warning_level.toUpperCase()} RISK
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Confidence</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div 
                    className="bg-orange-600 h-2 rounded-full" 
                    style={{ width: `${data.resource_strain.confidence}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{data.resource_strain.confidence}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface SustainabilityScoreProps {
  data: {
    overall: number
    factors: {
      environmental: number
      economic: number
      social: number
      governance: number
    }
    last_updated: string
  }
}

export const SustainabilityScore: React.FC<SustainabilityScoreProps> = ({ data }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
      <CardHeader>
        <h3 className="text-2xl font-semibold text-gray-800 text-center">
          Tourism Sustainability Score
        </h3>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className={`text-6xl font-bold ${getScoreColor(data.overall)} mb-2`}>
            {data.overall}/100
          </div>
          <div className="text-gray-600">
            Last updated: {new Date(data.last_updated).toLocaleDateString()}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(data.factors.environmental)}`}>
              {data.factors.environmental}
            </div>
            <div className="text-sm text-gray-600">Environmental</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(data.factors.economic)}`}>
              {data.factors.economic}
            </div>
            <div className="text-sm text-gray-600">Economic</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(data.factors.social)}`}>
              {data.factors.social}
            </div>
            <div className="text-sm text-gray-600">Social</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(data.factors.governance)}`}>
              {data.factors.governance}
            </div>
            <div className="text-sm text-gray-600">Governance</div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button variant="primary">
            Generate Full Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
