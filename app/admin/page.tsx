"use client"
import React, { useState, useEffect } from 'react'
import SignInPage from './signin'
import { getAllWaitlistEntries, getWaitlistStats, WaitlistEntry } from '@/lib/waitlist-admin'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([])
  const [stats, setStats] = useState({ total: 0, recent: 0 })
  const [loading, setLoading] = useState(false)

  const handleLogin = async (payload: { email: string; password: string }) => {
    console.log('Login attempt:', payload)
    setLoginError('')
    
    // Get credentials from environment variables
    const adminEmail1 = process.env.NEXT_PUBLIC_ADMIN_EMAIL_1 || 'erdenebatbayar3@gmail.com'
    const adminEmail2 = process.env.NEXT_PUBLIC_ADMIN_EMAIL_2 || 'danielsivyer4567@gmail.com'
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'Tradeease123'
    
    // Validate credentials
    const isValidEmail = payload.email === adminEmail1 || payload.email === adminEmail2
    const isValidPassword = payload.password === adminPassword
    
    if (isValidEmail && isValidPassword) {
      setIsAuthenticated(true)
      console.log('Login successful for:', payload.email)
      // Fetch waitlist data after successful login
      fetchWaitlistData()
    } else {
      setLoginError('Invalid email or password')
      console.log('Login failed for:', payload.email)
    }
  }

  const fetchWaitlistData = async () => {
    setLoading(true)
    try {
      const [entries, statsData] = await Promise.all([
        getAllWaitlistEntries(),
        getWaitlistStats()
      ])
      setWaitlistEntries(entries)
      setStats(statsData)
    } catch (error) {
      console.error('Error fetching waitlist data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (payload: { name: string; email: string; password: string }) => {
    console.log('Signup attempt:', payload)
    // Add your signup logic here
  }

  const handleSocial = async (provider: string) => {
    console.log('Social login attempt:', provider)
    // Add your social login logic here
  }

  // Show admin dashboard if authenticated
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-white/70 mt-1">Manage your waitlist and analytics</p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={fetchWaitlistData}
                  disabled={loading}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  {loading ? 'Refreshing...' : 'Refresh'}
                </Button>
                <Button
                  onClick={() => setIsAuthenticated(false)}
                  variant="destructive"
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-200 border-red-500/30"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm font-medium">Total Signups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{stats.total}</div>
                <p className="text-white/70 text-xs mt-1">All time waitlist entries</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm font-medium">Recent Signups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{stats.recent}</div>
                <p className="text-white/70 text-xs mt-1">Last 30 days</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm font-medium">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {stats.total > 0 ? ((stats.recent / stats.total) * 100).toFixed(1) : 0}%
                </div>
                <p className="text-white/70 text-xs mt-1">Recent vs total</p>
              </CardContent>
            </Card>
          </div>

          {/* Waitlist Entries Table */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Waitlist Entries</CardTitle>
              <CardDescription className="text-white/70">
                All users who have signed up for the waitlist
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-white/70">Loading waitlist entries...</div>
              ) : waitlistEntries.length === 0 ? (
                <div className="text-center py-8 text-white/70">No waitlist entries found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-3 px-4 text-white font-medium">Name</th>
                        <th className="text-left py-3 px-4 text-white font-medium">Email</th>
                        <th className="text-left py-3 px-4 text-white font-medium">Business</th>
                        <th className="text-left py-3 px-4 text-white font-medium">Industry</th>
                        <th className="text-left py-3 px-4 text-white font-medium">Date</th>
                        <th className="text-left py-3 px-4 text-white font-medium">Solutions</th>
                        <th className="text-left py-3 px-4 text-white font-medium">Features</th>
                      </tr>
                    </thead>
                    <tbody>
                      {waitlistEntries.map((entry, index) => (
                        <tr key={entry.id} className="border-b border-white/10 hover:bg-white/5">
                          <td className="py-3 px-4 text-white">
                            {entry.first_name} {entry.last_name}
                          </td>
                          <td className="py-3 px-4 text-white/80">{entry.email}</td>
                          <td className="py-3 px-4 text-white/80">{entry.business_name}</td>
                          <td className="py-3 px-4">
                            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                              {entry.industry}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-white/80">
                            {new Date(entry.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-white/80 max-w-xs truncate" title={entry.solutions}>
                            {entry.solutions}
                          </td>
                          <td className="py-3 px-4 text-white/80 max-w-xs truncate" title={entry.features}>
                            {entry.features}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <SignInPage
      initialMode="login"
      onLogin={handleLogin}
      onSignup={handleSignup}
      onSocial={handleSocial}
      loginError={loginError}
    />
  )
}

export default AdminPage