"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  MapPin,
  AlertTriangle,
  ArrowRight,
  LocateFixed,
  Download,
  Search,
  CheckCircle2,
  Clock,
  ChevronRight,
  Building2,
} from "lucide-react";
import {
  OfficialRecord,
  Report,
  RiskLevel,
  ProjectCategory,
} from "@/types/types";
import { supabase } from "@/lib/dbConnect";

// --- DYNAMIC MAP IMPORT ---
const MapVisualizer = dynamic(
  () => import("@/components/MapView/Mapvisualizer"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-slate-100 flex items-center justify-center animate-pulse rounded-xl">
        <div className="flex flex-col items-center gap-2">
          <Building2 className="w-8 h-8 text-slate-300" />
          <span className="text-xs text-slate-400 font-medium">
            Loading Map...
          </span>
        </div>
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
    description: "Resurfacing of promenade.",
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
    description: "Structural reinforcement.",
  },
];

const MY_REPORTS = [
  {
    id: "REP-8821",
    project: "Dadar Station Skywalk",
    date: "2 Oct 2025",
    status: "Verified",
    risk: "High",
    verdict: "Structural cracks detected.",
  },
  {
    id: "REP-9921",
    project: "Linking Road Potholes",
    date: "15 Sep 2025",
    status: "Resolved",
    risk: "Medium",
    verdict: "Uneven surface depth > 5cm.",
  },
];

const MY_DOCS = [
  {
    id: "RTI-2025-001",
    type: "RTI Request",
    title: "Tender Docs - Dadar Skywalk",
    date: "3 Oct 2025",
    status: "Ready",
  },
  {
    id: "CMP-2025-042",
    type: "Formal Complaint",
    title: "Linking Road Negligence",
    date: "16 Sep 2025",
    status: "Submitted",
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "reports" | "rti">("overview");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<OfficialRecord | null>(null);
  const [records, setRecords] = useState<OfficialRecord[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [stats, setStats] = useState({
    issuesNearMe: 0,
    myReports: 0,
    highRisk: 0,
  });
  const [user, setUser] = useState<any>(null);
  const [myDocs, setMyDocs] = useState<any[]>([]);

  // Fetch Initial Data
  useEffect(() => {
    const fetchData = async () => {
      // 0. Fetch User
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // 1. Fetch Projects
      const { data: projects } = await supabase.from('government_projects').select('*');
      if (projects) setRecords(projects as unknown as OfficialRecord[]);

      // 2. Fetch Reports
      const { data: reportsData } = await supabase
        .from('citizen_reports')
        .select('*, audit_results(*, government_projects(*))');

      if (reportsData) {
        setReports(reportsData);

        // Calculate Stats
        const highRiskCount = reportsData.filter(r => r.audit_results?.[0]?.risk_level === 'High').length;
        const myReportsCount = user ? reportsData.filter(r => r.user_id === user.id).length : 0;

        setStats({
          issuesNearMe: reportsData.length,
          myReports: myReportsCount,
          highRisk: highRiskCount,
        });
      }

      // 3. Fetch Legal Docs
      if (user) {
        const { data: docs } = await supabase
          .from('legal_documents')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        // @ts-ignore
        if (docs) setMyDocs(docs);
      }
    };

    fetchData();

    // 3. Realtime Subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'citizen_reports' },
        () => fetchData()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'audit_results' },
        () => fetchData()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'legal_documents' },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleGenerateRTI = async () => {
    if (!user) return alert("Please login to generate RTI.");

    const { error } = await supabase.from('legal_documents').insert({
      user_id: user.id,
      type: 'RTI Request',
      title: 'Draft RTI - ' + new Date().toLocaleDateString(),
      content: 'Pending generation...',
      status: 'Draft'
    });

    if (error) alert("Failed to create draft.");
  };

  // Geo-location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        () => setUserLocation({ lat: 19.076, lng: 72.8777 })
      );
    }
  }, []);

  // --- COMPONENT: SIDEBAR ---
  const Sidebar = () => (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col h-full shrink-0 z-20">
      <nav className="p-4 space-y-2 flex-1">
        <button
          onClick={() => setActiveTab("overview")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "overview"
            ? "bg-slate-900 text-white shadow-md"
            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
        >
          <LayoutDashboard size={18} /> Overview
        </button>
        <button
          onClick={() => setActiveTab("reports")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "reports"
            ? "bg-slate-900 text-white shadow-md"
            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
        >
          <ClipboardList size={18} /> My Reports
        </button>
        <button
          onClick={() => setActiveTab("rti")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "rti"
            ? "bg-slate-900 text-white shadow-md"
            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
        >
          <FileText size={18} /> RTI & Complaints
        </button>
      </nav>

      {/* User Mini Profile */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
            HK
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-slate-700 truncate">
              {user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Citizen"}
            </p>
            <p className="text-xs text-slate-400 truncate">{user?.email || "Guest"}</p>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden ">
      <Sidebar />

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header Mobile Toggle could go here */}

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* ================================================= */}
            {/* VIEW 1: CITY OVERVIEW (Home)                      */}
            {/* ================================================= */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      City Overview
                    </h2>
                    <p className="text-slate-500">
                      Real-time infrastructure monitoring
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border text-sm">
                    <LocateFixed size={16} className="text-blue-500" />
                    {userLocation ? "Location Active" : "Locating..."}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-xl border shadow-sm flex justify-between">
                    <div>
                      <p className="text-xs text-slate-500 uppercase">
                        Issues Near Me
                      </p>
                      <h3 className="text-3xl font-bold">{stats.issuesNearMe}</h3>
                    </div>
                    <MapPin />
                  </div>
                  <div className="bg-white p-5 rounded-xl border shadow-sm flex justify-between">
                    <div>
                      <p className="text-xs text-slate-500 uppercase">
                        My Reports
                      </p>
                      <h3 className="text-3xl font-bold">{stats.myReports}</h3>
                    </div>
                    <CheckCircle2 />
                  </div>
                  <div className="bg-red-500 text-white p-5 rounded-xl shadow-sm flex justify-between">
                    <div>
                      <p className="text-xs uppercase">High Risk</p>
                      <h3 className="text-3xl font-bold">{stats.highRisk}</h3>
                    </div>
                    <AlertTriangle />
                  </div>
                </div>

                <div className="bg-white p-1 rounded-2xl border shadow-sm">
                  <div className="px-5 py-3 border-b">
                    <h3 className="font-bold">Live Infrastructure Map</h3>
                  </div>
                  <div className="h-[350px] w-full overflow-hidden rounded-xl">
                    <MapVisualizer
                      records={records}
                      reports={reports}
                      onRecordSelect={setSelectedRecord}
                      userLocation={userLocation}
                    />
                  </div>
                </div>
                {/* Bottom Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6">
                  <div className="p-5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200 flex justify-between items-center">
                    <div>
                      <p className="text-blue-100 text-xs font-bold uppercase">
                        My Contributions
                      </p>
                      <h3 className="text-3xl font-bold">12</h3>
                    </div>
                    <CheckCircle2 size={32} className="text-blue-200" />
                  </div>
                  <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
                    <div>
                      <p className="text-slate-500 text-xs font-bold uppercase">
                        Alerts Near Me
                      </p>
                      <h3 className="text-3xl font-bold text-slate-900">3</h3>
                    </div>
                    <AlertTriangle size={32} className="text-orange-500" />
                  </div>
                  <Link href="/auditview" className="group">
                    <div className="h-full p-5 bg-slate-900 rounded-xl text-white shadow-sm flex items-center justify-between cursor-pointer group-hover:bg-slate-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-700 rounded-lg">
                          <AlertTriangle size={20} />
                        </div>
                        <span className="font-bold">Report New Issue</span>
                      </div>
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            )}

            {/* ================================================= */}
            {/* VIEW 2: MY REPORTS                                */}
            {/* ================================================= */}
            {activeTab === "reports" && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-900">
                    My Reports
                  </h2>
                  <Link href="/auditview">
                    <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-700 transition-all flex items-center gap-2">
                      <AlertTriangle size={16} /> New Report
                    </button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {reports.filter(r => user && r.user_id === user.id).map((report) => (
                    <div
                      key={report.id}
                      className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-slate-400">
                              #{report.id.slice(0, 8)}
                            </span>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs text-slate-500">
                              {new Date(report.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-800">
                            {report.audit_results?.[0]?.government_projects?.project_name || "General Report"}
                          </h3>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase self-start md:self-center ${report.audit_results?.[0]?.risk_level === "High"
                            ? "bg-red-50 text-red-600 border border-red-100"
                            : report.audit_results?.[0]?.risk_level === "Medium"
                              ? "bg-amber-50 text-amber-600 border border-amber-100"
                              : "bg-green-50 text-green-600 border border-green-100"
                            }`}
                        >
                          {report.audit_results?.[0]?.risk_level || "Pending"} Risk
                        </div>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <p className="text-sm text-slate-700 italic">
                          "AI Verdict: {report.audit_results?.[0]?.ai_verdict || "Awaiting audit..."}"
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${report.status === "Verified"
                              ? "bg-green-500"
                              : "bg-blue-500"
                              }`}
                          ></div>
                          <span className="text-xs font-bold text-slate-600 uppercase">
                            {report.status}
                          </span>
                        </div>
                        <Link href="/auditview">
                          <button className="text-sm text-blue-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
                            View Details <ArrowRight size={16} />
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ================================================= */}
            {/* VIEW 3: RTI & COMPLAINTS                          */}
            {/* ================================================= */}
            {activeTab === "rti" && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    RTI & Complaints
                  </h2>
                  <p className="text-slate-500">
                    Manage legal documents generated from your audits.
                  </p>
                </div>

                {/* Generator Card */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">
                      Generate New RTI Draft
                    </h3>
                    <p className="text-blue-100 text-sm mb-6 max-w-lg">
                      Use our AI Legal Assistant to draft a Right to Information
                      request based on your verified audit data. We auto-fill
                      technical details to ensure compliance.
                    </p>
                    <button
                      onClick={handleGenerateRTI}
                      className="bg-white text-blue-700 px-5 py-2.5 rounded-lg text-sm font-bold shadow hover:bg-blue-50 transition-colors">
                      Start Generator
                    </button>
                  </div>
                  <FileText className="absolute -bottom-6 -right-6 w-40 h-40 text-white/10 rotate-12" />
                </div>

                {/* Document List */}
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Recent Documents
                  </h3>
                  <div className="space-y-3">
                    {myDocs.map((doc) => (
                      <div
                        key={doc.id}
                        className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between group hover:border-blue-300 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                            <FileText size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-sm">
                              {doc.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                              <span className="font-mono">{doc.id}</span>
                              <span>•</span>
                              <span>{doc.type}</span>
                              <span>•</span>
                              <span
                                className={
                                  doc.status === "Ready"
                                    ? "text-green-600 font-bold"
                                    : "text-slate-500"
                                }
                              >
                                {doc.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => alert("Downloading PDF...")}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Download PDF"
                          >
                            <Download size={18} />
                          </button>
                          <button
                            onClick={() => alert("Opening document viewer...")}
                            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
