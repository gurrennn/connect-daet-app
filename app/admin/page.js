'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import AdminOnly from "../components/AdminOnly"

function AdminDashboardContent() {
  const [loading, setLoading] = useState(true)
  const [generatingReport, setGeneratingReport] = useState(null)
  const [analyticsData, setAnalyticsData] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    monthlyRevenue: 45200000,
    jobsCreated: 8234,
    monthlyVisitors: 156000,
    resourceEfficiency: 92,
    subsystems: {
      museum: { emojiUsage: 156, sentiment: 'positive', active: true, emojis: ['😊', '👍', '❤️', '🎉', '🌟'] },
      tours: { emojiUsage: 234, sentiment: 'positive', active: true, emojis: ['😊', '👍', '❤️', '🎉', '🏖️'] },
      shop: { emojiUsage: 189, sentiment: 'positive', active: true, emojis: ['😊', '👍', '💪', '🎯', '📈'] },
      experiences: { emojiUsage: 145, sentiment: 'neutral', active: true, emojis: ['😊', '👍', '❤️', '🎯', '💯'] },
      programs: { emojiUsage: 98, sentiment: 'positive', active: true, emojis: ['😊', '👍', '❤️', '🎉', '🌟'] },
      crisis: { emojiUsage: 23, sentiment: 'negative', active: false, emojis: ['⚠️', '🛠️', '📉', '😢', '🚨'] },
      rewards: { emojiUsage: 267, sentiment: 'positive', active: true, emojis: ['😊', '👍', '❤️', '🎉', '💯'] },
      feedback: { emojiUsage: 312, sentiment: 'positive', active: true, emojis: ['😊', '👍', '❤️', '🎉', '🌟'] },
      info: { emojiUsage: 67, sentiment: 'neutral', active: true, emojis: ['😊', '👍', '❓', '💡', '📖'] },
      workflow: { emojiUsage: 45, sentiment: 'neutral', active: true, emojis: ['😊', '👍', '⚙️', '📋', '✅'] }
    },
    topEmojis: ['😊', '👍', '❤️', '🎉', '🌟', '🏖️', '🎯', '💯', '⚠️', '🛠️'],
    sentimentTrend: 'stable'
  })

  useEffect(() => {
    // Data is already set in initial state, just simulate loading
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const generateReport = async (reportType) => {
    console.log('generateReport called with type:', reportType)
    setGeneratingReport(reportType)
    
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('analyticsData:', analyticsData)
      
      let reportContent = ''
      
      if (reportType === 'tourism-impact') {
        // Tourism Impact Assessment Report
        reportContent = `TOURISM IMPACT ASSESSMENT AND DATA ANALYTICS SYSTEM
Generated: ${new Date().toLocaleDateString()}

=====================================
Tourism Impact Assessment Report
=====================================

○ Description: Uses AI to analyze visitor spending, job creation, and resource usage, helping the municipality make data-driven decisions for sustainable development.

1. EXECUTIVE SUMMARY
------------------
Total Visitors: ${analyticsData.monthlyVisitors.toLocaleString()}
Total Revenue Generated: ₱${(analyticsData.monthlyRevenue / 1000000).toFixed(1)}M
Jobs Created: ${analyticsData.jobsCreated.toLocaleString()}
Resource Efficiency: ${analyticsData.resourceEfficiency}%

2. VISITOR SPENDING ANALYSIS
----------------------------
Average Spending per Visitor: ₱${Math.round(analyticsData.monthlyRevenue / analyticsData.monthlyVisitors).toLocaleString()}
Monthly Spending Growth: ${((Math.random() * 20) - 10).toFixed(1)}% (AI Predicted)
Top Spending Categories: 
  • Museum Tours: ₱${(Math.random() * 5000 + 2000).toFixed(0)}
  • Local Experiences: ₱${(Math.random() * 3000 + 1500).toFixed(0)}
  • Shopping & Souvenirs: ₱${(Math.random() * 2000 + 1000).toFixed(0)}
  • Food & Dining: ₱${(Math.random() * 4000 + 2500).toFixed(0)}

3. JOB CREATION IMPACT
----------------------
Direct Tourism Jobs: ${Math.round(analyticsData.jobsCreated * 0.6).toLocaleString()}
Indirect Employment: ${Math.round(analyticsData.jobsCreated * 0.4).toLocaleString()}
New Businesses Started: ${Math.round(analyticsData.jobsCreated * 0.15).toLocaleString()}
Average Wage Increase: 12.5%

4. RESOURCE USAGE ANALYSIS
--------------------------
Energy Consumption: ${Math.round(Math.random() * 30 + 70)}% of capacity
Water Usage: ${Math.round(Math.random() * 25 + 60)}% of allocation
Waste Management: ${Math.round(Math.random() * 15 + 80)}% diversion rate
Carbon Footprint: -${Math.round(Math.random() * 10 + 5)}% (improvement)

5. AI-DRIVEN INSIGHTS
----------------------
🤖 Predictive Analytics:
• Next quarter visitor growth: +${(Math.random() * 15 + 5).toFixed(1)}%
• Peak season recommendation: December-January
• High-value visitor segments: International tourists, Business travelers

📊 Sentiment Analysis:
• Overall visitor satisfaction: ${(Math.random() * 2 + 3).toFixed(1)}/5.0 stars
• Positive feedback rate: ${(Math.random() * 20 + 75).toFixed(1)}%
• Areas needing attention: Parking availability, Signage clarity

6. SUSTAINABILITY RECOMMENDATIONS
----------------------------------
🌱 Environmental Actions:
• Implement renewable energy in tourist facilities
• Enhance waste recycling programs
• Promote eco-friendly transportation options

💰 Economic Strategies:
• Support local entrepreneurship in tourism sector
• Develop year-round tourism attractions
• Invest in digital tourism infrastructure

👥 Community Development:
• Train local youth for hospitality careers
• Preserve cultural heritage sites
• Create accessible tourism for all demographics

7. DATA-DRIVEN DECISION SUPPORT
----------------------------------
📈 Key Metrics to Monitor:
• Visitor spending patterns by season
• Employment multipliers by tourism sector
• Resource utilization efficiency rates
• Community satisfaction indices

🎯 Recommended Actions:
1. Expand museum digital experiences - High engagement detected
2. Optimize tour scheduling during peak seasons
3. Develop sustainable tourism certification program
4. Create real-time visitor flow monitoring system

=====================================
End of Tourism Impact Assessment
=====================================
        `.trim()
      } else {
        // Original full analytics report
        const totalEmojiUsage = Object.values(analyticsData.subsystems).reduce((sum, sys) => sum + sys.emojiUsage, 0)
        const subsystemsCount = Object.keys(analyticsData.subsystems).length
        const topEmojisList = analyticsData.topEmojis.join(', ')
        
        // Build report content step by step
        reportContent = 'CONNECT-DAET ANALYTICS REPORT\n'
        reportContent += 'Generated: ' + new Date().toLocaleDateString() + '\n\n'
        reportContent += '=====================================\n'
        reportContent += 'CONNECT-Daet Analytics System Report\n'
        reportContent += '=====================================\n\n'
        
        reportContent += '1. SYSTEM OVERVIEW\n'
        reportContent += '-------------------\n'
        reportContent += 'Total Emoji Usage: ' + totalEmojiUsage + '\n'
        reportContent += 'Subsystems Tracked: ' + subsystemsCount + '\n'
        reportContent += 'Top Emojis: ' + topEmojisList + '\n'
        reportContent += 'Overall Sentiment Trend: ' + analyticsData.sentimentTrend + '\n\n'
        
        reportContent += '2. KEY METRICS\n'
        reportContent += '--------------\n'
        reportContent += 'Monthly Revenue: ₱' + (analyticsData.monthlyRevenue / 1000000).toFixed(1) + 'M\n'
        reportContent += 'Jobs Created: ' + analyticsData.jobsCreated.toLocaleString() + '\n'
        reportContent += 'Monthly Visitors: ' + analyticsData.monthlyVisitors.toLocaleString() + '\n'
        reportContent += 'Resource Efficiency: ' + analyticsData.resourceEfficiency + '%\n\n'
        
        reportContent += '3. SUBSYSTEM PERFORMANCE\n'
        reportContent += '-------------------------\n'
        
        // Add each subsystem
        Object.entries(analyticsData.subsystems).forEach(([name, data]) => {
          const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
          reportContent += capitalizedName + ' System: ' + data.emojiUsage + ' emojis, ' + data.sentiment + ' sentiment\n'
          if (data.emojis && data.emojis.length > 0) {
            reportContent += '  Top Emojis: ' + data.emojis.join(', ') + '\n'
          }
          reportContent += '\n'
        })
        
        reportContent += '4. USER STATISTICS\n'
        reportContent += '------------------\n'
        reportContent += 'Total Registered Users: ' + analyticsData.totalUsers.toLocaleString() + '\n'
        reportContent += 'Currently Active Users: ' + analyticsData.activeUsers.toLocaleString() + '\n'
        reportContent += 'User Engagement Rate: ' + ((analyticsData.activeUsers / analyticsData.totalUsers) * 100).toFixed(1) + '%\n\n'
        
        reportContent += '5. RECOMMENDATIONS\n'
        reportContent += '------------------\n'
        
        const positiveSystems = Object.entries(analyticsData.subsystems)
          .filter(([name, sys]) => sys.sentiment === 'positive')
          .sort((a, b) => b[1].emojiUsage - a[1].emojiUsage)
          .slice(0, 2)
          .map(([name]) => name)
        
        const negativeSystems = Object.entries(analyticsData.subsystems)
          .filter(([name, sys]) => sys.sentiment === 'negative')
          .map(([name]) => name)
        
        reportContent += '1. Focus on ' + positiveSystems.join(' and ') + ' systems - they drive most positive engagement\n'
        if (negativeSystems.length > 0) {
          reportContent += '2. Address ' + negativeSystems.join(' and ') + ' system workflow - high negative sentiment detected\n'
        }
        reportContent += '3. Expand rewards program - positive emoji usage increasing across all systems\n\n'
        
        reportContent += '=====================================\n'
        reportContent += 'End of Report\n'
        reportContent += '=====================================\n'
      }
      
      console.log('Final report content length:', reportContent.length)
      console.log('Report content preview:', reportContent.substring(0, 200) + '...')
      
      // Create blob and download
      const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = reportType === 'tourism-impact' 
        ? 'tourism-impact-assessment-' + new Date().toISOString().split('T')[0] + '.txt'
        : 'connect-daet-analytics-report-' + new Date().toISOString().split('T')[0] + '.txt'
      document.body.appendChild(a)
      a.click()
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      }, 100)
      
      const reportName = reportType === 'tourism-impact' 
        ? 'Tourism Impact Assessment' 
        : 'CONNECT-DAET Analytics Report'
      
      alert(reportName + ' generated successfully! Check your downloads.')
      
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
          <p className="text-gray-400">Loading Admin Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-gray-900 text-white">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">🏛️ CONNECT-DAET Analytics Dashboard</h1>
          <p className="text-gray-400">Real-time system monitoring and insights</p>
        </div>

        {/* OVERVIEW ANALYTICS SECTION */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">📊 Overview Analytics</h2>
          
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Users */}
            <Card className="bg-gradient-to-r from-blue-800 to-blue-900 border-blue-700">
              <CardContent className="p-6">
                <div className="text-3xl font-bold mb-2">{analyticsData.totalUsers.toLocaleString()}</div>
                <div className="text-blue-100">Total Users</div>
                <div className="text-sm text-blue-200 mt-2">Registered accounts</div>
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

          {/* Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Visitor Trends Chart */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <h3 className="text-xl font-semibold text-white">📈 Visitor Trends</h3>
                <p className="text-gray-400 text-sm">Monthly visitor statistics</p>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-700 rounded">
                  <div className="text-center">
                    <div className="text-4xl mb-4">📊</div>
                    <p className="text-gray-400">Chart: Visitor Trends</p>
                    <p className="text-2xl font-bold text-white mt-2">{analyticsData.monthlyVisitors.toLocaleString()}</p>
                    <p className="text-gray-400">Monthly Visitors</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Chart */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <h3 className="text-xl font-semibold text-white">💰 Revenue Analysis</h3>
                <p className="text-gray-400 text-sm">Monthly revenue breakdown</p>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-700 rounded">
                  <div className="text-center">
                    <div className="text-4xl mb-4">💹</div>
                    <p className="text-gray-400">Chart: Revenue Analysis</p>
                    <p className="text-2xl font-bold text-white mt-2">₱{(analyticsData.monthlyRevenue / 1000000).toFixed(1)}M</p>
                    <p className="text-gray-400">Monthly Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emoji Usage Chart */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <h3 className="text-xl font-semibold text-white">😊 Emoji Usage</h3>
                <p className="text-gray-400 text-sm">Top emojis across all systems</p>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-700 rounded">
                  <div className="text-center">
                    <div className="text-4xl mb-4">😊👍❤️🎉🌟</div>
                    <p className="text-gray-400">Chart: Top Emojis</p>
                    <p className="text-lg font-bold text-white mt-2">{analyticsData.topEmojis.slice(0, 5).join(' ')}</p>
                    <p className="text-gray-400">Most Popular</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* REPORT GENERATION SECTION */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <h3 className="text-xl font-semibold text-white">� Generate Reports</h3>
            <p className="text-gray-400 text-sm">Create professional analytics reports</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  onClick={() => generateReport('tourism-impact')}
                  disabled={generatingReport === 'tourism-impact'}
                >
                  {generatingReport === 'tourism-impact' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                      Generating Tourism Impact...
                    </>
                  ) : (
                    '🏖️ Tourism Impact Assessment'
                  )}
                </Button>
                <p className="text-sm text-gray-400">AI-driven tourism analysis</p>
              </div>
              
              <div className="text-center">
                <Button 
                  variant="warning"
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

        {/* ADMIN ACCESS INFO */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            🔒 Admin-only access • Protected by CONNECT-DAET Security System
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Tourists and regular users cannot access this system.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <AdminOnly>
      <AdminDashboardContent />
    </AdminOnly>
  )
}
