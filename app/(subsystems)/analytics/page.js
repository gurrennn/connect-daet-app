'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import { 
  VisitorSpendingChart, 
  FootTrafficChart, 
  RewardsChart, 
  SentimentChart, 
  DemographicsChart, 
  ResourceUsageChart 
} from './components/Charts'
import { PredictiveAnalytics, SustainabilityScore } from './components/PredictiveAnalytics'
import {
  getVisitorSpending,
  getFootTraffic,
  getRewardsData,
  getSentimentAnalysis,
  getDemographics,
  getResourceUsage,
  getPredictiveTrends,
  getSustainabilityScore
} from '../../lib/analytics-fetcher'

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    visitorSpending: [],
    footTraffic: [],
    rewards: [],
    sentiment: { positive: 0, neutral: 0, negative: 0 },
    demographics: [],
    resourceUsage: [],
    predictive: null,
    sustainability: null
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          visitorSpending,
          footTraffic,
          rewards,
          sentiment,
          demographics,
          resourceUsage,
          predictive,
          sustainability
        ] = await Promise.all([
          getVisitorSpending(),
          getFootTraffic(),
          getRewardsData(),
          getSentimentAnalysis(),
          getDemographics(),
          getResourceUsage(),
          getPredictiveTrends(),
          getSustainabilityScore()
        ])

        setData({
          visitorSpending,
          footTraffic,
          rewards,
          sentiment,
          demographics,
          resourceUsage,
          predictive,
          sustainability
        })
      } catch (error) {
        console.error('Error fetching analytics data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tourism Impact Assessment & Data Analytics
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered analytics system for monitoring visitor spending, job creation, and resource usage to drive sustainable development decisions
          </p>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2">₱45.2M</div>
              <div className="text-blue-100">Monthly Revenue</div>
              <div className="text-sm text-blue-200 mt-2">↑ 12% from last month</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2">8,234</div>
              <div className="text-green-100">Jobs Created</div>
              <div className="text-sm text-green-200 mt-2">↑ 5% from last quarter</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2">156K</div>
              <div className="text-purple-100">Monthly Visitors</div>
              <div className="text-sm text-purple-200 mt-2">↑ 8% from last month</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2">92%</div>
              <div className="text-orange-100">Resource Efficiency</div>
              <div className="text-sm text-orange-200 mt-2">↑ 3% improvement</div>
            </CardContent>
          </Card>
        </div>

        {/* Predictive Analytics */}
        {data.predictive && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">AI-Powered Predictions</h2>
            <PredictiveAnalytics data={data.predictive} />
          </div>
        )}

        {/* Sustainability Score */}
        {data.sustainability && (
          <div className="mb-8">
            <SustainabilityScore data={data.sustainability} />
          </div>
        )}

        {/* Analytics Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <VisitorSpendingChart data={data.visitorSpending} />
          <FootTrafficChart data={data.footTraffic} />
          <RewardsChart data={data.rewards} />
          <SentimentChart data={data.sentiment} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <DemographicsChart data={data.demographics} />
          <ResourceUsageChart data={data.resourceUsage} />
        </div>

        {/* Report Generation */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-gray-800">Generate Custom Reports</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Monthly Tourism Report</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Comprehensive monthly analysis of tourism metrics and economic impact
                  </p>
                  <Button variant="primary" className="w-full">
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Sustainability Assessment</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Environmental impact analysis and resource utilization metrics
                  </p>
                  <Button variant="primary" className="w-full">
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Economic Impact Study</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Detailed analysis of tourism's contribution to local economy
                  </p>
                  <Button variant="primary" className="w-full">
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Data Source Information */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-800">Data Sources & Integration</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Revenue Data</h4>
                <p className="text-gray-600">Shop transactions (Team 7) + Tour bookings (Team 8)</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Foot Traffic</h4>
                <p className="text-gray-600">Museum scans (Team 3) + Experience check-ins (Team 4)</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Sentiment Analysis</h4>
                <p className="text-gray-600">Feedback ratings (Team 9) + Reviews</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Rewards Tracking</h4>
                <p className="text-gray-600">Reward history (Team 11) + Gamification metrics</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Resource Usage</h4>
                <p className="text-gray-600">Facility utilization + Environmental monitoring</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Demographics</h4>
                <p className="text-gray-600">User profiles + Booking data analysis</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
