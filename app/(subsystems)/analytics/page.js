'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import AdminOnly from "../../components/AdminOnly"

function AdminAnalyticsContent() {
  const [loading, setLoading] = useState(true)
  const [generatingReport, setGeneratingReport] = useState(null)
  const [analyticsData, setAnalyticsData] = useState({
    totalUsers: 0,
    activeUsers: 0,
    monthlyRevenue: 0,
    jobsCreated: 0,
    monthlyVisitors: 0,
    resourceEfficiency: 0,
    subsystems: {
      museum: { emojiUsage: 0, sentiment: 'neutral', active: false },
      tours: { emojiUsage: 0, sentiment: 'neutral', active: false },
      shop: { emojiUsage: 0, sentiment: 'neutral', active: false },
      experiences: { emojiUsage: 0, sentiment: 'neutral', active: false },
      programs: { emojiUsage: 0, sentiment: 'neutral', active: false },
      crisis: { emojiUsage: 0, sentiment: 'neutral', active: false },
      rewards: { emojiUsage: 0, sentiment: 'neutral', active: false },
      feedback: { emojiUsage: 0, sentiment: 'neutral', active: false },
      info: { emojiUsage: 0, sentiment: 'neutral', active: false },
      workflow: { emojiUsage: 0, sentiment: 'neutral', active: false }
    },
    topEmojis: [],
    sentimentTrend: 'stable'
  })

  useEffect(() => {
    // Simulate loading real-time analytics data
    const loadAnalyticsData = () => {
      const mockData = {
        totalUsers: 1247,
        activeUsers: 892,
        monthlyRevenue: 45200000,
        jobsCreated: 8234,
        monthlyVisitors: 156000,
        resourceEfficiency: 92,
        subsystems: {
          museum: { emojiUsage: 156, sentiment: 'positive', active: true },
          tours: { emojiUsage: 234, sentiment: 'positive', active: true },
          shop: { emojiUsage: 189, sentiment: 'positive', active: true },
          experiences: { emojiUsage: 145, sentiment: 'neutral', active: true },
          programs: { emojiUsage: 98, sentiment: 'positive', active: true },
          crisis: { emojiUsage: 23, sentiment: 'negative', active: false },
          rewards: { emojiUsage: 267, sentiment: 'positive', active: true },
          feedback: { emojiUsage: 312, sentiment: 'positive', active: true },
          info: { emojiUsage: 67, sentiment: 'neutral', active: true },
          workflow: { emojiUsage: 45, sentiment: 'neutral', active: true }
        },
        topEmojis: ['😊', '👍', '❤️', '🎉', '🌟', '🏖️', '🎯', '💯'],
        sentimentTrend: 'stable'
      }
      setAnalyticsData(mockData)
      setTimeout(() => setLoading(false), 1000)
    }

    loadAnalyticsData()
  }, [])

  const generateReport = async (reportType) => {
    setGeneratingReport(reportType)
    
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create professional report based on real-time data
      const reportContent = `
CONNECT-DAET ANALYTICS REPORT
Generated: ${new Date().toLocaleDateString()}

=====================================
CONNECT-Daet Analytics System Report
=====================================

1. SYSTEM OVERVIEW
-------------------
Total Emoji Usage: ${Object.values(analyticsData.subsystems).reduce((sum, sys) => sum + sys.emojiUsage, 0)}
Subsystems Tracked: ${Object.keys(analyticsData.subsystems).length}
Top Emojis: ${analyticsData.topEmojis.join(', ')}
Overall Sentiment Trend: ${analyticsData.sentimentTrend}

2. KEY METRICS
--------------
Monthly Revenue: ₱${(analyticsData.monthlyRevenue / 1000000).toFixed(1)}M
Jobs Created: ${analyticsData.jobsCreated.toLocaleString()}
Monthly Visitors: ${analyticsData.monthlyVisitors.toLocaleString()}
Resource Efficiency: ${analyticsData.resourceEfficiency}%

3. SUBSYSTEM PERFORMANCE
-------------------------
Museum System: ${analyticsData.subsystems.museum.emojiUsage} emojis, ${analyticsData.subsystems.museum.sentiment} sentiment
Tours System: ${analyticsData.subsystems.tours.emojiUsage} emojis, ${analyticsData.subsystems.tours.sentiment} sentiment
Shop System: ${analyticsData.subsystems.shop.emojiUsage} emojis, ${analyticsData.subsystems.shop.sentiment} sentiment
Experiences System: ${analyticsData.subsystems.experiences.emojiUsage} emojis, ${analyticsData.subsystems.experiences.sentiment} sentiment
Programs System: ${analyticsData.subsystems.programs.emojiUsage} emojis, ${analyticsData.subsystems.programs.sentiment} sentiment
Crisis System: ${analyticsData.subsystems.crisis.emojiUsage} emojis, ${analyticsData.subsystems.crisis.sentiment} sentiment
Rewards System: ${analyticsData.subsystems.rewards.emojiUsage} emojis, ${analyticsData.subsystems.rewards.sentiment} sentiment
Feedback System: ${analyticsData.subsystems.feedback.emojiUsage} emojis, ${analyticsData.subsystems.feedback.sentiment} sentiment
Info System: ${analyticsData.subsystems.info.emojiUsage} emojis, ${analyticsData.subsystems.info.sentiment} sentiment
Workflow System: ${analyticsData.subsystems.workflow.emojiUsage} emojis, ${analyticsData.subsystems.workflow.sentiment} sentiment

4. USER STATISTICS
------------------
Total Registered Users: ${analyticsData.totalUsers.toLocaleString()}
Currently Active Users: ${analyticsData.activeUsers.toLocaleString()}
User Engagement Rate: ${((analyticsData.activeUsers / analyticsData.totalUsers) * 100).toFixed(1)}%

5. RECOMMENDATIONS
------------------
1. Focus on ${Object.entries(analyticsData.subsystems).filter(([name, sys]) => sys.sentiment === 'positive').sort((a, b) => b[1].emojiUsage - a[1].emojiUsage).slice(0, 2).map(([name]) => name).join(' and ')} systems - they drive most positive engagement
2. Address ${Object.entries(analyticsData.subsystems).filter(([name, sys]) => sys.sentiment === 'negative').map(([name]) => name).join(' and ')} system workflow - high negative sentiment detected
3. Expand rewards program - positive emoji usage increasing across all systems

=====================================
End of Report
=====================================
      `.trim()
      
      // Create blob and download
      const blob = new Blob([reportContent], { type: 'text/plain' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `connect-daet-analytics-report-${new Date().toISOString().split('T')[0]}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      
      alert('CONNECT-DAET Analytics Report generated successfully! Check your downloads.')
      
    } catch (error) {
      console.error('Error generating report:', error)
      alert('Failed to generate report. Please try again.')
    } finally {
      setGeneratingReport(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading Admin Analytics...</p>
        </div>
      </div>
    )
  }

  const getSentimentColor = (sentiment) => {
    switch(sentiment) {
      case 'positive': return 'text-green-400'
      case 'negative': return 'text-red-400'
      case 'neutral': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getSentimentIcon = (sentiment) => {
    switch(sentiment) {
      case 'positive': return '📈'
      case 'negative': return '📉'
      case 'neutral': return '➡️'
      default: return '❓'
    }
  }

  return (
    <div className="min-h-full bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🏛️ CONNECT-DAET Analytics - Admin Overview
          </h1>
          <p className="text-gray-400">
            Real-time analytics and reporting system for administrators
          </p>
        </div>

        {/* TOP ROW: User Statistics & Key Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <Card className="bg-gradient-to-r from-blue-800 to-blue-900 border-blue-700">
            <CardContent className="p-6">
              <div className="text-3xl font-bold mb-2">{analyticsData.totalUsers.toLocaleString()}</div>
              <div className="text-blue-100">Total Users</div>
              <div className="text-sm text-blue-200 mt-2">Registered in system</div>
            </CardContent>
          </Card>

          {/* Active Users */}
          <Card className="bg-gradient-to-r from-green-800 to-green-900 border-green-700">
            <CardContent className="p-6">
              <div className="text-3xl font-bold mb-2">{analyticsData.activeUsers.toLocaleString()}</div>
              <div className="text-green-100">Active Users</div>
              <div className="text-sm text-green-200 mt-2">Currently online</div>
            </CardContent>
          </Card>

          {/* Monthly Revenue */}
          <Card className="bg-gradient-to-r from-purple-800 to-purple-900 border-purple-700">
            <CardContent className="p-6">
              <div className="text-3xl font-bold mb-2">₱{(analyticsData.monthlyRevenue / 1000000).toFixed(1)}M</div>
              <div className="text-purple-100">Monthly Revenue</div>
              <div className="text-sm text-purple-200 mt-2">All subsystems</div>
            </CardContent>
          </Card>

          {/* Jobs Created */}
          <Card className="bg-gradient-to-r from-orange-800 to-orange-900 border-orange-700">
            <CardContent className="p-6">
              <div className="text-3xl font-bold mb-2">{analyticsData.jobsCreated.toLocaleString()}</div>
              <div className="text-orange-100">Jobs Created</div>
              <div className="text-sm text-orange-200 mt-2">Local employment</div>
            </CardContent>
          </Card>
        </div>

        {/* SUBSYSTEM PERFORMANCE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Top Performing Systems */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <h3 className="text-xl font-semibold text-white">📊 Subsystem Performance</h3>
              <p className="text-gray-400 text-sm">Real-time emoji usage and sentiment</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(analyticsData.subsystems).map(([name, data]) => (
                  <div key={name} className="flex justify-between items-center p-3 bg-gray-700 rounded">
                    <div className="flex items-center">
                      <span className={`w-3 h-3 rounded-full mr-3 ${data.active ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                      <div>
                        <div className="font-semibold text-white capitalize">{name}</div>
                        <div className="text-gray-400 text-sm">
                          {data.emojiUsage} emojis • {getSentimentIcon(data.sentiment)} {data.sentiment}
                        </div>
                      </div>
                    </div>
                    <div className={`text-right ${getSentimentColor(data.sentiment)}`}>
                      {data.emojiUsage}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Top Emojis & Trends */}
          <div className="space-y-6">
            {/* Top Emojis */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <h3 className="text-xl font-semibold text-white">😊 Top Emojis</h3>
                <p className="text-gray-400 text-sm">Most used across all systems</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analyticsData.topEmojis.map((emoji, index) => (
                    <span key={index} className="text-2xl bg-gray-700 px-3 py-2 rounded">
                      {emoji}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sentiment Trend */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <h3 className="text-xl font-semibold text-white">📈 Overall Trend</h3>
                <p className="text-gray-400 text-sm">System-wide sentiment</p>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${getSentimentColor(analyticsData.sentimentTrend)}`}>
                    {getSentimentIcon(analyticsData.sentimentTrend)} {analyticsData.sentimentTrend.toUpperCase()}
                  </div>
                  <div className="text-gray-400">Overall Sentiment Trend</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* REPORT GENERATION SECTION */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <h3 className="text-xl font-semibold text-white">📋 Generate Reports</h3>
            <p className="text-gray-400 text-sm">Create professional analytics reports</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <Button 
                  variant="primary"
                  className="w-full mb-2"
                  onClick={() => generateReport('full')}
                  disabled={generatingReport === 'full'}
                >
                  {generatingReport === 'full' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                      Generating Report...
                    </>
                  ) : (
                    '📊 Generate Full Report'
                  )}
                </Button>
                <p className="text-sm text-gray-400">Complete system analysis</p>
              </div>
              
              <div className="text-center">
                <Button 
                  variant="success"
                  className="w-full mb-2"
                  onClick={() => generateReport('summary')}
                  disabled={generatingReport === 'summary'}
                >
                  {generatingReport === 'summary' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                      Generating Summary...
                    </>
                  ) : (
                    '📋 Quick Summary'
                  )}
                </Button>
                <p className="text-sm text-gray-400">Key metrics only</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ADMIN INFO */}
        <div className="mt-8 text-center">
          <Card className="bg-gray-800 border-gray-700 inline-block">
            <CardContent className="p-4">
              <h4 className="text-lg font-semibold text-white mb-2">🔒 Admin Only Access</h4>
              <p className="text-gray-400 text-sm">
                This analytics dashboard is restricted to administrators only.
                <br />
                Tourists and regular users cannot access this system.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function AdminAnalyticsPage() {
  return (
    <AdminOnly>
      <AdminAnalyticsContent />
    </AdminOnly>
  )
}
