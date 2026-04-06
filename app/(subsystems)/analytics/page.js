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
import { ReportGenerator } from './components/ReportGenerator'
import { AdminDashboard } from './components/AdminDashboard'
import AdminOnly from '../../components/AdminOnly'
import {
  getVisitorSpending,
  getFootTraffic,
  getRewardsData,
  getSentimentAnalysis,
  getDemographics,
  getResourceUsage,
  getPredictiveTrends,
  getSustainabilityScore,
  getSpendingByDuration
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
    sustainability: null,
    spendingByDuration: []
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
          sustainability,
          spendingByDuration
        ] = await Promise.all([
          getVisitorSpending(),
          getFootTraffic(),
          getRewardsData(),
          getSentimentAnalysis(),
          getDemographics(),
          getResourceUsage(),
          getPredictiveTrends(),
          getSustainabilityScore(),
          getSpendingByDuration()
        ])

        setData({
          visitorSpending,
          footTraffic,
          rewards,
          sentiment,
          demographics,
          resourceUsage,
          predictive,
          sustainability,
          spendingByDuration
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
      <AdminOnly fallback={
        <div className="min-h-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 mb-4">Access Denied</div>
            <p className="text-gray-600">Admin access required to view analytics</p>
          </div>
        </div>
      }>
        <div className="min-h-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading analytics data...</p>
          </div>
        </div>
      </AdminOnly>
    )
  }

  return (
    <AdminOnly fallback={
      <div className="min-h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600 mb-4">Access Denied</div>
          <p className="text-gray-600">Admin access required to view analytics</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    }>
      <AdminDashboard data={data} />
    </AdminOnly>
  )
}
