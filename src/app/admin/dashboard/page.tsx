"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
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
  MoreHorizontal,
  Menu,
  X,
  Building2,
  FileText,
  ChevronRight,
  Map as MapIcon,
  BrainCircuit,
} from "lucide-react";
import {
  Report,
  OfficialRecord,
  RiskLevel,
  ProjectCategory,
} from "@/types/types";

// --- DYNAMIC MAP IMPORT ---
const MapVisualizer = dynamic(
  () => import("@/components/MapView/Mapvisualizer"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] w-full bg-slate-100 flex items-center justify-center animate-pulse rounded-xl">
        <Building2 className="w-8 h-8 text-slate-300" />
      </div>
    ),
  }
);

// --- MOCK DATA ---
const MOCK_RECORDS: OfficialRecord[] = [
  {
    id: "MCGM-001",
    projectName: "Marine Drive Resurfacing",
    category: ProjectCategory.ROAD,
    budget: 45000000,
    contractor: "Mumbai Infra Ltd",
    deadline: "2024-06-30",
    status: "Completed",
    location: { lat: 18.944, lng: 72.823 },
    description: "Resurfacing.",
  },
  {
    id: "MCGM-002",
    projectName: "Dadar Skywalk Repair",
    category: ProjectCategory.BUILDING,
    budget: 12000000,
    contractor: "Urban Connect",
    deadline: "2024-08-15",
    status: "In Progress",
    location: { lat: 19.0178, lng: 72.8478 },
    description: "Repair.",
  },
];

const MOCK_REPORTS: Report[] = [
  {
    id: "REP-001",
    matchedRecordId: "MCGM-002",
    status: "Verified",
    auditResult: {
      riskLevel: RiskLevel.HIGH,
      discrepancies: ["Major Cracks"],
      reasoning: "Critical failure.",
      confidenceScore: 0.95,
    },
    evidence: {
      timestamp: Date.now(),
      coordinates: { lat: 19.0178, lng: 72.8478 },
      image: "",
    },
  },
  {
    id: "REP-002",
    matchedRecordId: "MCGM-001",
    status: "Verified",
    auditResult: {
      riskLevel: RiskLevel.LOW,
      discrepancies: [],
      reasoning: "All good.",
      confidenceScore: 0.99,
    },
    evidence: {
      timestamp: Date.now(),
      coordinates: { lat: 18.944, lng: 72.823 },
      image: "",
    },
  },
];

const MOCK_USERS = [
  {
    id: 1,
    name: "Rahul S.",
    email: "rahul@example.com",
    role: "Citizen",
    status: "Active",
  },
  {
    id: 2,
    name: "Admin User",
    email: "admin@integrity.gov.in",
    role: "Admin",
    status: "Active",
  },
  {
    id: 3,
    name: "Bot Account",
    email: "spam@bot.com",
    role: "Citizen",
    status: "Flagged",
  },
];

const MOCK_RTI_REQUESTS = [
  {
    id: "RTI-2025-101",
    subject: "Request for Tender Docs - Dadar Skywalk",
    citizen: "Rahul S.",
    status: "Pending Review",
    date: "2025-10-12",
  },
  {
    id: "RTI-2025-102",
    subject: "Road Budget Inquiry - Andheri",
    citizen: "Anjali M.",
    status: "Approved",
    date: "2025-10-10",
  },
  {
    id: "RTI-2025-103",
    subject: "Drainage Contract Details",
    citizen: "Vikram R.",
    status: "Rejected",
    date: "2025-10-08",
  },
];

export default function AdminDashboardPage() {
  const [tab, setTab] = useState<
    "overview" | "issues" | "contractors" | "system" | "rti"
  >("overview");
  const [generatingReport, setGeneratingReport] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // --- DERIVED STATS ---
  const highRiskIssues = MOCK_REPORTS.filter(
    (r) => r.auditResult?.riskLevel === RiskLevel.HIGH
  );

  // Contractor Stats Logic
  const contractorStats: Record<
    string,
    { id: string; total: number; highRisk: number; budget: number }
  > = {};
  MOCK_RECORDS.forEach((rec) => {
    if (!contractorStats[rec.contractor]) {
      const contractorId = rec.contractor.toLowerCase().replace(/\s+/g, "-");
      contractorStats[rec.contractor] = {
        id: contractorId,
        total: 0,
        highRisk: 0,
        budget: 0,
      };
    }
    contractorStats[rec.contractor].total += 1;
    contractorStats[rec.contractor].budget += rec.budget;

    const recReports = MOCK_REPORTS.filter((r) => r.matchedRecordId === rec.id);
    if (recReports.some((r) => r.auditResult?.riskLevel === RiskLevel.HIGH)) {
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
    <div className="flex h-screen bg-slate-50  font-sans text-slate-900 overflow-hidden">
      {/* 1. ADMIN SIDEBAR */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 text-slate-900 transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:flex md:flex-col shrink-0
        ${isMobileNavOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Brand */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Replaced Image with Icon for consistency, or keep your img tag if preferred */}
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Building2 size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-serif tracking-wide text-slate-900">
                INTEGRITY
              </h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                Admin Console
              </p>
            </div>
          </Link>
          <button
            onClick={() => setIsMobileNavOpen(false)}
            className="md:hidden text-slate-400 hover:text-slate-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            {
              id: "issues",
              label: "Issues & Risk",
              icon: AlertTriangle,
              count: highRiskIssues.length,
            },
            {
              id: "rti",
              label: "RTI Requests",
              icon: FileText,
              count: MOCK_RTI_REQUESTS.filter(
                (r) => r.status === "Pending Review"
              ).length,
            },
            { id: "contractors", label: "Contractors", icon: Users },
            { id: "system", label: "System Admin", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setTab(item.id as any);
                setIsMobileNavOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                tab === item.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} />
                {item.label}
              </div>
              {item.count !== undefined && item.count > 0 && (
                <span
                  className={`${
                    tab === item.id
                      ? "bg-blue-500 text-white"
                      : "bg-red-100 text-red-600"
                  } text-[10px] font-bold px-2 py-0.5 rounded-full`}
                >
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Admin User Footer */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center font-bold text-xs text-white">
              AD
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">
                Admin User
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                Super Administrator
              </p>
            </div>
          </div>
        </div>
      </aside>
      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="md:hidden p-2 bg-slate-100 rounded-lg text-slate-600"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-xl font-bold text-slate-900 capitalize">
              {tab.replace("-", " ")}
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="hidden sm:flex px-4 py-2 bg-white border border-slate-300 rounded-lg shadow-sm text-sm font-medium hover:bg-slate-50 items-center gap-2 transition-colors"
            >
              {generatingReport ? (
                <span className="w-4 h-4 border-2 border-slate-400 border-t-slate-800 rounded-full animate-spin"></span>
              ) : (
                <Download size={16} />
              )}
              {generatingReport ? "Exporting..." : "Export Log"}
            </button>

            <Link href="/admin/projects/new">
              <button className="px-4 py-2 bg-slate-900 text-white rounded-lg shadow-sm text-sm font-bold hover:bg-slate-800 flex items-center gap-2 transition-colors">
                <Plus size={16} />{" "}
                <span className="hidden sm:inline">New Project</span>
              </button>
            </Link>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {/* VIEW: OVERVIEW */}
            {tab === "overview" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-slate-500 text-xs font-bold uppercase mb-1">
                      Projects Managed
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      {MOCK_RECORDS.length}
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-slate-500 text-xs font-bold uppercase mb-1">
                      High Risk Alerts
                    </div>
                    <div className="text-3xl font-bold text-red-600 flex items-center gap-2">
                      {highRiskIssues.length} <AlertTriangle size={20} />
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-slate-500 text-xs font-bold uppercase mb-1">
                      Issues Resolved
                    </div>
                    <div className="text-3xl font-bold text-green-600 flex items-center gap-2">
                      1 <CheckCircle2 size={20} />
                    </div>
                  </div>
                  <div className="bg-slate-900 text-white p-5 rounded-xl shadow-sm">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-1">
                      System Health
                    </div>
                    <div className="text-3xl font-bold text-green-400 flex items-center gap-2">
                      99.9%{" "}
                      <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
                    </div>
                  </div>
                </div>

                {/* --- SPLIT VIEW: MAP & AI INSIGHT --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[350px]">
                  {/* MAP SECTION (Span 2) */}
                  <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-6 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center shrink-0">
                      <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                        <MapIcon size={16} className="text-blue-600" /> Live
                        Infrastructure Map
                      </h3>
                      <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>{" "}
                        Live
                      </span>
                    </div>
                    <div className="flex-1 relative z-0">
                      <MapVisualizer
                        records={MOCK_RECORDS}
                        reports={MOCK_REPORTS}
                        onRecordSelect={() => {}}
                      />
                    </div>
                  </div>

                  {/* AI INSIGHT CARD (Span 1) */}
                  {/* AI INSIGHT CARD (Clean Light Theme) */}
                  <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-blue-300 hover:shadow-md transition-all">
                    {/* Subtle Decoration */}

                    <div className="p-6 relative z-10">
                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-wide mb-4 border border-blue-100">
                        <TrendingUp size={12} /> AI Insight
                      </div>

                      {/* Content */}
                      <h3 className="font-bold text-lg text-slate-900 mb-2">
                        Risk Anomaly in Zone 4
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        Our models detected a cluster of reports linked to{" "}
                        <strong>"Mumbai Infra"</strong>. Their discrepancy rate
                        has spiked to{" "}
                        <span className="text-red-600 font-bold bg-red-50 px-1 rounded">
                          35%
                        </span>{" "}
                        this week.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* VIEW: ISSUES */}
            {tab === "issues" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {MOCK_REPORTS.map((report) => {
                  const record = MOCK_RECORDS.find(
                    (r) => r.id === report.matchedRecordId
                  );
                  return (
                    <div
                      key={report.id}
                      className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start gap-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-bold uppercase flex items-center gap-1 ${
                              report.auditResult?.riskLevel === RiskLevel.HIGH
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {report.auditResult?.riskLevel ===
                              RiskLevel.HIGH && <ShieldAlert size={12} />}
                            {report.auditResult?.riskLevel} Risk
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            #{record?.id}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {record?.projectName}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1 bg-slate-50 p-3 rounded-lg border border-slate-100 inline-block">
                          <span className="font-bold text-slate-700">
                            Discrepancy:
                          </span>{" "}
                          "{report.auditResult?.discrepancies[0]}"
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 min-w-[160px]">
                        <Link href={`/admin/reports/${report.id}`}>
                          <button className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 font-medium w-full text-left flex justify-between items-center group">
                            View Details{" "}
                            <ChevronRight
                              size={14}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </button>
                        </Link>
                        {report.status !== "Verified" && (
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

            {/* VIEW: RTI REQUESTS */}
            {tab === "rti" && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800">
                    RTI Drafts & Requests
                  </h3>
                  <div className="relative">
                    <Search
                      className="absolute left-2 top-1.5 text-slate-400"
                      size={14}
                    />
                    <input
                      type="text"
                      placeholder="Search RTI..."
                      className="pl-7 pr-3 py-1 text-sm border border-slate-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                    <tr>
                      <th className="px-6 py-4">RTI ID</th>
                      <th className="px-6 py-4">Subject</th>
                      <th className="px-6 py-4">Citizen</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MOCK_RTI_REQUESTS.map((rti) => (
                      <tr
                        key={rti.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-mono text-xs text-slate-500">
                          {rti.id}
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-900 text-sm">
                          {rti.subject}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {rti.citizen}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {rti.date}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                              rti.status === "Approved"
                                ? "bg-green-100 text-green-700"
                                : rti.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {rti.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/admin/rti/${rti.id}`}>
                            <button className="text-blue-600 hover:text-blue-800 text-xs font-bold hover:underline">
                              Review
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* VIEW: CONTRACTORS */}
            {tab === "contractors" && (
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
                    {Object.entries(contractorStats).map(
                      ([name, stat], idx) => {
                        const riskPercentage =
                          stat.total > 0
                            ? (stat.highRisk / stat.total) * 100
                            : 0;
                        return (
                          <tr
                            key={idx}
                            className="hover:bg-slate-50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <Link
                                href={`/admin/contractor/${stat.id}`}
                                className="font-bold text-slate-900 hover:text-blue-600 hover:underline"
                              >
                                {name}
                              </Link>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">
                              {stat.total} Active
                            </td>
                            <td className="px-6 py-4 font-mono text-sm">
                              ₹{(stat.budget / 10000000).toFixed(2)} Cr
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
                                      riskPercentage > 30
                                        ? "bg-red-500"
                                        : "bg-green-500"
                                    }`}
                                    style={{
                                      width: `${Math.max(riskPercentage, 5)}%`,
                                    }}
                                  />
                                </div>
                                <span
                                  className={`text-xs font-bold ${
                                    riskPercentage > 30
                                      ? "text-red-600"
                                      : "text-green-600"
                                  }`}
                                >
                                  {riskPercentage.toFixed(0)}% Risk
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button className="text-slate-400 hover:text-slate-900">
                                <MoreHorizontal size={20} />
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* VIEW: SYSTEM ADMIN */}
            {tab === "system" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="font-bold text-slate-800">
                      User Management
                    </h3>
                    <div className="relative">
                      <Search
                        className="absolute left-2 top-1.5 text-slate-400"
                        size={14}
                      />
                      <input
                        type="text"
                        placeholder="Search..."
                        className="pl-7 pr-3 py-1 text-sm border border-slate-300 rounded-md focus:outline-none focus:border-blue-500"
                      />
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
                      {MOCK_USERS.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50">
                          <td className="px-6 py-3">
                            <div className="font-medium text-sm text-slate-900">
                              {u.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {u.email}
                            </div>
                          </td>
                          <td className="px-6 py-3 text-sm text-slate-600">
                            {u.role}
                          </td>
                          <td className="px-6 py-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                u.status === "Active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {u.status}
                            </span>
                          </td>
                          <td className="px-6 py-3 text-right">
                            <Link href={`/admin/users/${u.id}`}>
                              <button className="text-xs font-bold text-blue-600 hover:underline">
                                Edit
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                  <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Settings size={18} /> Platform Configuration
                  </h3>
                  <div className="space-y-6">
                    {[
                      {
                        label: "Strict AI Verification",
                        desc: "Higher confidence threshold (95%)",
                        active: true,
                      },
                      {
                        label: "Anonymous Reporting",
                        desc: "Allow reports without login",
                        active: true,
                      },
                      {
                        label: "Maintenance Mode",
                        desc: "Disable user submissions",
                        active: false,
                      },
                    ].map((setting, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <div className="text-sm font-bold text-slate-900">
                            {setting.label}
                          </div>
                          <div className="text-xs text-slate-500">
                            {setting.desc}
                          </div>
                        </div>
                        <div
                          className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${
                            setting.active ? "bg-blue-600" : "bg-slate-200"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
                              setting.active ? "right-1" : "left-1"
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
