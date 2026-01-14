'use client';
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Users, 
  Settings, 
  Download, 
  Plus, 
  Search,
  CheckCircle2,
  TrendingUp,
  ShieldAlert,
  MoreHorizontal
} from 'lucide-react';
import { Report, OfficialRecord, RiskLevel, ProjectCategory } from '@/types/types';

// --- MOCK DATA ---
const MOCK_RECORDS: OfficialRecord[] = [
  {
    id: 'MCGM-001',
    projectName: 'Marine Drive Resurfacing',
    category: ProjectCategory.ROAD,
    budget: 45000000,
    contractor: 'Mumbai Infra Ltd',
    deadline: '2024-06-30',
    status: 'Completed',
    location: { lat: 18.944, lng: 72.823 },
    description: 'Resurfacing.'
  },
  {
    id: 'MCGM-002',
    projectName: 'Dadar Skywalk Repair',
    category: ProjectCategory.BUILDING,
    budget: 12000000,
    contractor: 'Urban Connect',
    deadline: '2024-08-15',
    status: 'In Progress',
    location: { lat: 19.0178, lng: 72.8478 },
    description: 'Repair.'
  }
];

const MOCK_REPORTS: Report[] = [
  {
    id: 'REP-001',
    matchedRecordId: 'MCGM-002',
    status: 'Verified',
    auditResult: { riskLevel: RiskLevel.HIGH, discrepancies: ['Major Cracks'], reasoning: 'Critical failure.', confidenceScore: 0.95 },
    evidence: { timestamp: Date.now(), coordinates: {lat:0, lng:0}, image: '' }
  },
  {
    id: 'REP-002',
    matchedRecordId: 'MCGM-001',
    status: 'Verified',
    auditResult: { riskLevel: RiskLevel.LOW, discrepancies: [], reasoning: 'All good.', confidenceScore: 0.99 },
    evidence: { timestamp: Date.now(), coordinates: {lat:0, lng:0}, image: '' }
  }
];

const MOCK_USERS = [
  { id: 1, name: "Rahul S.", email: "rahul@example.com", role: "Citizen", status: "Active" },
  { id: 2, name: "Admin User", email: "admin@integrity.gov.in", role: "Admin", status: "Active" },
  { id: 3, name: "Bot Account", email: "spam@bot.com", role: "Citizen", status: "Flagged" },
];

export default function AdminDashboardPage() {
  const [tab, setTab] = useState<'overview' | 'issues' | 'contractors' | 'system'>('overview');
  const [generatingReport, setGeneratingReport] = useState(false);

  // --- DERIVED STATS ---
  const highRiskIssues = MOCK_REPORTS.filter(r => r.auditResult?.riskLevel === RiskLevel.HIGH);
  const verifiedIssues = MOCK_REPORTS.filter(r => r.status === 'Verified');
  
  // Contractor Stats Logic
  const contractorStats: Record<string, { total: number, highRisk: number, budget: number }> = {};
  MOCK_RECORDS.forEach(rec => {
    if (!contractorStats[rec.contractor]) {
      contractorStats[rec.contractor] = { total: 0, highRisk: 0, budget: 0 };
    }
    contractorStats[rec.contractor].total += 1;
    contractorStats[rec.contractor].budget += rec.budget;
    
    const recReports = MOCK_REPORTS.filter(r => r.matchedRecordId === rec.id);
    if (recReports.some(r => r.auditResult?.riskLevel === RiskLevel.HIGH)) {
      contractorStats[rec.contractor].highRisk += 1;
    }
  });

  const handleExport = () => {
    setGeneratingReport(true);
    setTimeout(() => {
      alert("Audit Report Generated!");
      setGeneratingReport(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">
      
      {/* 1. Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-serif tracking-tight">Central Command Center</h1>
            <p className="text-sm text-slate-500">Unified control for infrastructure oversight & administration.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleExport}
              className="px-4 py-2 bg-white border border-slate-300 rounded-lg shadow-sm text-sm font-medium hover:bg-slate-50 flex items-center gap-2 transition-colors"
            >
              {generatingReport ? (
                <span className="w-4 h-4 border-2 border-slate-400 border-t-slate-800 rounded-full animate-spin"></span>
              ) : (
                <Download size={16} />
              )}
              {generatingReport ? 'Exporting...' : 'Export Log'}
            </button>
            <button className="px-4 py-2 bg-slate-900 text-white rounded-lg shadow-sm text-sm font-bold hover:bg-slate-800 flex items-center gap-2 transition-colors">
              <Plus size={16} /> New Project
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="container mx-auto px-6 mt-2">
          <nav className="flex gap-6 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'issues', label: `Issues (${highRiskIssues.length})`, icon: AlertTriangle },
              { id: 'contractors', label: 'Contractors', icon: Users },
              { id: 'system', label: 'System Admin', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id as any)}
                className={`pb-3 flex items-center gap-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  tab === item.id 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* 2. Main Content */}
      <main className="container mx-auto px-6 py-8">
        
        {/* VIEW: OVERVIEW */}
        {tab === 'overview' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-slate-500 text-xs font-bold uppercase mb-1">Projects Managed</div>
                <div className="text-3xl font-bold text-slate-900">{MOCK_RECORDS.length}</div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-slate-500 text-xs font-bold uppercase mb-1">High Risk Alerts</div>
                <div className="text-3xl font-bold text-red-600 flex items-center gap-2">
                  {highRiskIssues.length} <AlertTriangle size={20} />
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-slate-500 text-xs font-bold uppercase mb-1">Issues Resolved</div>
                <div className="text-3xl font-bold text-green-600 flex items-center gap-2">
                  1 <CheckCircle2 size={20} />
                </div>
              </div>
              <div className="bg-slate-900 text-white p-5 rounded-xl shadow-sm">
                <div className="text-slate-400 text-xs font-bold uppercase mb-1">System Health</div>
                <div className="text-3xl font-bold text-green-400 flex items-center gap-2">
                  99.9% <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
                </div>
              </div>
            </div>

            {/* AI Insight Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6 rounded-xl flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm text-blue-600">
                <TrendingUp size={24} />
              </div>
              <div>
                <h3 className="font-bold text-blue-900 text-lg mb-1">AI Audit Insight</h3>
                <p className="text-blue-800 text-sm leading-relaxed max-w-3xl">
                  Recent patterns suggest a cluster of road quality issues in the Western Suburbs (Zone 4). 
                  Contractor "Mumbai Infra Projects Ltd" has a higher-than-average discrepancy rate (35%). 
                  <span className="font-bold block mt-1">Recommended Action: Initiate a targeted physical audit for Zone 4 projects.</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: ISSUES */}
        {tab === 'issues' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {MOCK_REPORTS.map(report => {
              const record = MOCK_RECORDS.find(r => r.id === report.matchedRecordId);
              return (
                <div key={report.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase flex items-center gap-1 ${
                        report.auditResult?.riskLevel === RiskLevel.HIGH ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {report.auditResult?.riskLevel === RiskLevel.HIGH && <ShieldAlert size={12} />}
                        {report.auditResult?.riskLevel} Risk
                      </span>
                      <span className="text-xs text-slate-400 font-mono">#{record?.id}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{record?.projectName}</h3>
                    <p className="text-sm text-slate-600 mt-1 bg-slate-50 p-3 rounded-lg border border-slate-100 inline-block">
                      <span className="font-bold text-slate-700">Discrepancy:</span> "{report.auditResult?.discrepancies[0]}"
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2 min-w-[160px]">
                    <button className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 font-medium w-full text-left">
                      View Evidence
                    </button>
                    {report.status !== 'Verified' && (
                      <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold w-full text-left shadow-sm">
                        Mark Resolved
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* VIEW: CONTRACTORS */}
        {tab === 'contractors' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                <tr>
                  <th className="px-6 py-4">Contractor</th>
                  <th className="px-6 py-4">Projects</th>
                  <th className="px-6 py-4">Budget Managed</th>
                  <th className="px-6 py-4">Risk Profile</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Object.entries(contractorStats).map(([name, stat], idx) => {
                  const riskPercentage = stat.total > 0 ? (stat.highRisk / stat.total) * 100 : 0;
                  return (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{stat.total} Active</td>
                      <td className="px-6 py-4 font-mono text-sm">₹{(stat.budget / 10000000).toFixed(2)} Cr</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${riskPercentage > 30 ? 'bg-red-500' : 'bg-green-500'}`} 
                              style={{width: `${Math.max(riskPercentage, 5)}%`}}
                            />
                          </div>
                          <span className={`text-xs font-bold ${riskPercentage > 30 ? 'text-red-600' : 'text-green-600'}`}>
                            {riskPercentage.toFixed(0)}% Risk
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-slate-900"><MoreHorizontal size={20} /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* VIEW: SYSTEM */}
        {tab === 'system' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* User Table */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-slate-800">User Management</h3>
                <div className="relative">
                  <Search className="absolute left-2 top-1.5 text-slate-400" size={14} />
                  <input type="text" placeholder="Search..." className="pl-7 pr-3 py-1 text-sm border border-slate-300 rounded-md focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                  <tr>
                    <th className="px-6 py-3">User</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_USERS.map(u => (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="px-6 py-3">
                        <div className="font-medium text-sm text-slate-900">{u.name}</div>
                        <div className="text-xs text-slate-500">{u.email}</div>
                      </td>
                      <td className="px-6 py-3 text-sm text-slate-600">{u.role}</td>
                      <td className="px-6 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${u.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <button className="text-xs font-bold text-blue-600 hover:underline">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Config Panel */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Settings size={18} /> Platform Configuration
              </h3>
              <div className="space-y-6">
                {[
                  { label: 'Strict AI Verification', desc: 'Higher confidence threshold (95%)', active: true },
                  { label: 'Anonymous Reporting', desc: 'Allow reports without login', active: true },
                  { label: 'Maintenance Mode', desc: 'Disable user submissions', active: false },
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-slate-900">{setting.label}</div>
                      <div className="text-xs text-slate-500">{setting.desc}</div>
                    </div>
                    <div className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${setting.active ? 'bg-blue-600' : 'bg-slate-200'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${setting.active ? 'right-1' : 'left-1'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}