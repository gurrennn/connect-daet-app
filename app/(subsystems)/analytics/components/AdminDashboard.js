'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import { 
  VisitorSpendingChart, 
  FootTrafficChart, 
  RewardsChart, 
  SentimentChart, 
  DemographicsChart, 
  ResourceUsageChart 
} from './Charts'
import { PredictiveAnalytics, SustainabilityScore } from './PredictiveAnalytics'
import { ReportGenerator } from './ReportGenerator'
import SpendingDurationChart from './SpendingDurationChart'

export const AdminDashboard = ({ data }) => {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'users', name: 'Users', icon: '👥' },
    { id: 'system', name: 'System', icon: '⚙️' },
    { id: 'reports', name: 'Reports', icon: '📋' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Admin Overview */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-800">System Overview</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">11</div>
                    <div className="text-sm text-gray-600">Total Subsystems</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">45.2K</div>
                    <div className="text-sm text-gray-600">Active Users</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">98.7%</div>
                    <div className="text-sm text-gray-600">System Health</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-3xl font-bold text-orange-600">₱45.2M</div>
                    <div className="text-sm text-gray-600">Monthly Revenue</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subsystem Performance */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-800">Subsystem Performance</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">🏛️ Museum System</h4>
                      <span className="text-sm text-green-600">● Healthy</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Daily Visitors</div>
                        <div className="text-lg font-semibold">1,234</div>
                      </div>
                      <div>
                        <div className="text-gray-600">QR Scans</div>
                        <div className="text-lg font-semibold">856</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">🏖️ Shop System</h4>
                      <span className="text-sm text-green-600">● Healthy</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Daily Sales</div>
                        <div className="text-lg font-semibold">₱45,678</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Orders</div>
                        <div className="text-lg font-semibold">234</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">🎯 Tours System</h4>
                      <span className="text-sm text-green-600">● Healthy</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Daily Bookings</div>
                        <div className="text-lg font-semibold">89</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Revenue</div>
                        <div className="text-lg font-semibold">₱12,345</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Alerts */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-800">System Alerts</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">⚠️</span>
                      <div>
                        <div className="font-semibold text-red-800">Crisis System Alert</div>
                        <div className="text-sm text-red-600">3 active alerts require attention</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">📈</span>
                      <div>
                        <div className="font-semibold text-yellow-800">Performance Warning</div>
                        <div className="text-sm text-yellow-600">Shop system experiencing 15% slowdown</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'analytics':
        return (
          <div className="space-y-6">
            {/* Analytics Header */}
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

            {/* Tourist Spending by Duration */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Tourist Spending by Duration</h2>
              <SpendingDurationChart data={data.spendingByDuration} />
            </div>
          </div>
        )

      case 'users':
        return (
          <div className="space-y-6">
            {/* User Management */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-800">User Management</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Recent User Activity</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <div className="font-medium">John Doe</div>
                          <div className="text-sm text-gray-600">Tourist • Last active 2 min ago</div>
                        </div>
                        <div className="text-sm text-green-600">Active</div>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <div className="font-medium">Jane Smith</div>
                          <div className="text-sm text-gray-600">Local • Last active 1 hour ago</div>
                        </div>
                        <div className="text-sm text-green-600">Active</div>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <div className="font-medium">Admin User</div>
                          <div className="text-sm text-gray-600">System • Last active 5 min ago</div>
                        </div>
                        <div className="text-sm text-green-600">Active</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">System Statistics</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="text-gray-600">Total Users</div>
                        <div className="text-lg font-semibold">45,234</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="text-gray-600">Active Today</div>
                        <div className="text-lg font-semibold">1,234</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="text-gray-600">New This Week</div>
                        <div className="text-lg font-semibold">234</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="text-gray-600">Premium Users</div>
                        <div className="text-lg font-semibold">2,345</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admin Actions */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-800">Admin Actions</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="primary" className="w-full">
                    👥 Manage Users
                  </Button>
                  <Button variant="secondary" className="w-full">
                    📧 Send Notifications
                  </Button>
                  <Button variant="success" className="w-full">
                    🔧 User Settings
                  </Button>
                  <Button variant="warning" className="w-full">
                    📊 Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'system':
        return (
          <div className="space-y-6">
            {/* System Health */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-800">System Health</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">System Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Uptime</span>
                        <span className="font-semibold text-green-600">99.9%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Response Time</span>
                        <span className="font-semibold">1.2s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Error Rate</span>
                        <span className="font-semibold text-green-600">0.1%</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Database Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Connections</span>
                        <span className="font-semibold text-green-600">45/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Query Time</span>
                        <span className="font-semibold">0.3s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Storage</span>
                        <span className="font-semibold text-yellow-600">78%</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">API Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Requests/min</span>
                        <span className="font-semibold">1,234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Success Rate</span>
                        <span className="font-semibold text-green-600">99.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg Response</span>
                        <span className="font-semibold">0.8s</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Controls */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-800">System Controls</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="primary" className="w-full">
                    ⚙️ System Settings
                  </Button>
                  <Button variant="secondary" className="w-full">
                    📧 Maintenance Mode
                  </Button>
                  <Button variant="success" className="w-full">
                    🔄 Restart Services
                  </Button>
                  <Button variant="warning" className="w-full">
                    📋 System Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'reports':
        return (
          <div className="space-y-6">
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

            {/* Report Generator */}
            <ReportGenerator data={data} />

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
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">CONNECT-Daet System Administration</p>
        </div>
        
        {/* Tab Navigation */}
        <div className="px-6">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-6">
        {renderTabContent()}
      </div>
    </div>
  )
}
