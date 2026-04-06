'use client'

import { Card, CardContent, CardHeader } from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'

export const ReportGenerator = ({ data }) => {
  const generateFullReport = () => {
    const report = {
      title: 'CONNECT-Daet Analytics System Report',
      date: new Date().toLocaleDateString(),
      sections: [
        {
          name: 'System Overview',
          content: {
            totalEmojiUsage: data.emojiAnalysis?.totalEmojiUsage || 0,
            subsystemsTracked: Object.keys(data.emojiAnalysis?.subsystemBreakdown || {}).length,
            topEmojis: data.emojiAnalysis?.topEmojis?.slice(0, 5) || [],
            sentimentTrend: data.emojiAnalysis?.sentimentTrends?.[0]?.trend || 'stable'
          }
        },
        {
          name: 'Key Metrics',
          content: {
            monthlyRevenue: '₱45.2M',
            jobsCreated: '8,234',
            monthlyVisitors: '156K',
            resourceEfficiency: '92%'
          }
        },
        {
          name: 'Subsystem Performance',
          content: data.emojiAnalysis?.subsystemBreakdown || {}
        },
        {
          name: 'Recommendations',
          content: [
            'Focus on museum and tours systems - they drive most positive engagement',
            'Address crisis system workflow - high negative sentiment detected',
            'Expand rewards program - positive emoji usage increasing across all systems'
          ]
        }
      ]
    }

    // Create downloadable report
    const reportText = `
CONNECT-DAET ANALYTICS REPORT
Generated: ${report.date}

=====================================
${report.title}
=====================================

1. SYSTEM OVERVIEW
-------------------
Total Emoji Usage: ${report.sections[0].content.totalEmojiUsage.toLocaleString()}
Subsystems Tracked: ${report.sections[0].content.subsystemsTracked}
Top Emojis: ${report.sections[0].content.topEmojis.map(e => `${e.emoji} (${e.percentage}%)`).join(', ')}
Overall Sentiment Trend: ${report.sections[0].content.sentimentTrend}

2. KEY METRICS
--------------
Monthly Revenue: ${report.sections[1].content.monthlyRevenue}
Jobs Created: ${report.sections[1].content.jobsCreated}
Monthly Visitors: ${report.sections[1].content.monthlyVisitors}
Resource Efficiency: ${report.sections[1].content.resourceEfficiency}

3. SUBSYSTEM PERFORMANCE
-------------------------
${Object.entries(report.sections[2].content).map(([subsystem, data]) => 
  `${subsystem.toUpperCase()}: ${data.total.toLocaleString()} emojis (Top: ${data.topEmojis.join(', ')})`
).join('\n')}

4. RECOMMENDATIONS
------------------
${report.sections[3].content.map((rec, index) => `${index + 1}. ${rec}`).join('\n')}

=====================================
End of Report
=====================================
    `

    // Download report as text file
    const blob = new Blob([reportText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const exportToJSON = () => {
    const reportData = {
      generated: new Date().toISOString(),
      analytics: {
        emojiAnalysis: data.emojiAnalysis,
        visitorSpending: data.visitorSpending,
        footTraffic: data.footTraffic,
        rewards: data.rewards,
        sentiment: data.sentiment,
        demographics: data.demographics,
        resourceUsage: data.resourceUsage,
        predictive: data.predictive,
        sustainability: data.sustainability
      }
    }

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-data-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-800">Analytics Report Generator</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Report Summary */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Report Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-blue-600 font-bold">Total Emoji Usage</div>
                <div className="text-gray-700">{data.emojiAnalysis?.totalEmojiUsage?.toLocaleString() || '0'}</div>
              </div>
              <div>
                <div className="text-blue-600 font-bold">Active Subsystems</div>
                <div className="text-gray-700">{Object.keys(data.emojiAnalysis?.subsystemBreakdown || {}).length}</div>
              </div>
              <div>
                <div className="text-blue-600 font-bold">Top Emoji</div>
                <div className="text-gray-700">{data.emojiAnalysis?.topEmojis?.[0]?.emoji || 'N/A'}</div>
              </div>
              <div>
                <div className="text-blue-600 font-bold">Sentiment Trend</div>
                <div className="text-gray-700">{data.emojiAnalysis?.sentimentTrends?.[0]?.trend || 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">How It Works</h4>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start">
                <span className="text-green-600 mr-2">📊</span>
                <div>
                  <strong>Emoji Tracking:</strong> Monitors emoji usage across all 10 subsystems to measure user sentiment and engagement
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-2">📈</span>
                <div>
                  <strong>Trend Analysis:</strong> Identifies patterns in visitor behavior and system performance over time
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-2">🤖</span>
                <div>
                  <strong>AI Insights:</strong> Provides actionable recommendations based on data patterns
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-2">📋</span>
                <div>
                  <strong>Report Generation:</strong> Creates comprehensive reports for stakeholders
                </div>
              </div>
            </div>
          </div>

          {/* What To Do */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">What To Do</h4>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <strong>1. Monitor Daily:</strong> Check emoji sentiment trends to identify issues early
              </div>
              <div>
                <strong>2. Review Weekly:</strong> Analyze subsystem performance and compare metrics
              </div>
              <div>
                <strong>3. Act on Insights:</strong> Implement AI recommendations to improve user experience
              </div>
              <div>
                <strong>4. Generate Reports:</strong> Create monthly reports for stakeholders and decision-making
              </div>
              <div>
                <strong>5. Optimize Systems:</strong> Use data to improve underperforming subsystems
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-4">Export Reports</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                variant="primary" 
                onClick={generateFullReport}
                className="w-full"
              >
                📄 Generate Full Report
              </Button>
              <Button 
                variant="secondary" 
                onClick={exportToJSON}
                className="w-full"
              >
                📊 Export Raw Data (JSON)
              </Button>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">Key Insights</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center">
                <span className="text-2xl mr-2">😊</span>
                <span><strong>Positive Sentiment:</strong> {data.emojiAnalysis?.sentimentTrends?.[0]?.positive || 0}% of users are happy</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-2">📈</span>
                <span><strong>Growth Trend:</strong> Emoji usage increasing across all systems</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-2">⚠️</span>
                <span><strong>Attention Needed:</strong> Crisis system requires immediate review</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
