'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import {
  Users,
  FileText,
  AlertTriangle,
  TrendingUp,
  Settings,
  LogOut,
  Shield,
  BarChart3,
  CheckCircle,
  Clock,
  XCircle,
  Building2,
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
      setIsLoggingOut(false);
    }
  };

  // Mock stats data
  const stats = {
    totalUsers: 1247,
    totalReports: 3842,
    pendingReviews: 127,
    highRiskReports: 43,
  };

  const recentReports = [
    {
      id: '1',
      title: 'Road Construction Delay',
      location: 'Mumbai, Maharashtra',
      status: 'pending',
      risk: 'high',
      date: '2026-01-15',
    },
    {
      id: '2',
      title: 'Bridge Quality Issue',
      location: 'Delhi, NCR',
      status: 'review',
      risk: 'medium',
      date: '2026-01-14',
    },
    {
      id: '3',
      title: 'Water Supply Disruption',
      location: 'Bangalore, Karnataka',
      status: 'resolved',
      risk: 'low',
      date: '2026-01-13',
    },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'review':
        return <AlertTriangle className="w-4 h-4 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-slate-400">Project INTEGRITY</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold">{user?.name}</p>
                <p className="text-xs text-slate-400">{user?.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                disabled={isLoggingOut}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-sm text-slate-500 font-medium mb-1">Total Users</h3>
            <p className="text-3xl font-bold text-slate-900">{stats.totalUsers.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-sm text-slate-500 font-medium mb-1">Total Reports</h3>
            <p className="text-3xl font-bold text-slate-900">{stats.totalReports.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-sm text-slate-500 font-medium mb-1">Pending Reviews</h3>
            <p className="text-3xl font-bold text-slate-900">{stats.pendingReviews}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <h3 className="text-sm text-slate-500 font-medium mb-1">High Risk Reports</h3>
            <p className="text-3xl font-bold text-slate-900">{stats.highRiskReports}</p>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Recent Reports</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All →
            </button>
          </div>

          <div className="space-y-4">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">{getStatusIcon(report.status)}</div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{report.title}</h3>
                    <p className="text-sm text-slate-500">{report.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRiskColor(
                      report.risk
                    )}`}
                  >
                    {report.risk.toUpperCase()}
                  </span>
                  <span className="text-sm text-slate-500">{report.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow text-left group">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
              <BarChart3 className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">View Analytics</h3>
            <p className="text-sm text-slate-500">Comprehensive platform statistics</p>
          </button>

          <button className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow text-left group">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
              <Users className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Manage Users</h3>
            <p className="text-sm text-slate-500">User roles and permissions</p>
          </button>

          <button className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow text-left group">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
              <Settings className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">System Settings</h3>
            <p className="text-sm text-slate-500">Configure platform settings</p>
          </button>
        </div>
      </main>
    </div>
  );
}
