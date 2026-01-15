"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link"; // Import Link for navigation
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  MapPin,
  AlertTriangle,
  ArrowRight,
  LocateFixed,
  Download,
  CheckCircle2,
  Building2,
  Menu,
  X,
  Camera,
} from "lucide-react";
import { OfficialRecord, ProjectCategory } from "@/types/types";

// --- DYNAMIC MAP IMPORT ---
const MapVisualizer = dynamic(
  () => import("@/components/MapView/Mapvisualizer"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-slate-100 flex items-center justify-center animate-pulse rounded-xl">
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
    verdict: "Uneven surface.",
  },
];

const MY_DOCS = [
  {
    id: "RTI-2025-001",
    title: "Tender Docs - Dadar Skywalk",
    date: "3 Oct 2025",
    status: "Ready",
    type: "RTI Request",
  },
  {
    id: "CMP-2025-042",
    title: "Linking Road Negligence",
    date: "16 Sep 2025",
    status: "Submitted",
    type: "Formal Complaint",
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "reports" | "rti">(
    "overview"
  );
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<OfficialRecord | null>(
    null
  );
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [userCity, setUserCity] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setUserLocation({ lat, lng });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
          const data = await res.json();

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.state;

          setUserCity(city);
        } catch {
          setUserCity("Unknown Location");
        }
      },
      () => {
        setUserLocation({ lat: 19.076, lng: 72.8777 });
        setUserCity("Mumbai");
      }
    );
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* 1. SIDEBAR */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-[2000] w-64 bg-white text-slate-900 transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:flex md:flex-col shrink-0
        ${isMobileNavOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className=" flex justify-between items-center">
          <button
            onClick={() => setIsMobileNavOpen(false)}
            className="md:hidden text-slate-400"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "reports", label: "My Reports", icon: ClipboardList },
            { id: "rti", label: "RTI & Docs", icon: FileText },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as any);
                setIsMobileNavOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between shrink-0 relative z-[1500]">
          <h2 className="font-bold text-slate-900">Dashboard</h2>
          <button
            onClick={() => setIsMobileNavOpen(true)}
            className="p-2 bg-slate-100 rounded-lg"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Scrollable Content Wrapper */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 scroll-smooth relative z-0">
          <div className="max-w-7xl mx-auto">
            {/* --- VIEW: CITY OVERVIEW --- */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Header Stats */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      City Pulse
                    </h2>
                    <p className="text-slate-500 text-xs">
                      Monitoring infrastructure health in real-time.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm text-xs font-bold text-slate-700 flex items-center gap-2">
                      <LocateFixed size={14} className="text-blue-500" />
                      {userCity ? `${userCity} (Active)` : "Locating..."}
                    </div>
                  </div>
                </div>

                {/* Main Grid: Map & Projects */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* MAP WIDGET */}
                  <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[350px] relative z-0 group">
                    <div className="absolute top-3 left-3 z-[500] bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold shadow-sm border border-slate-200">
                      Live View
                    </div>

                    <MapVisualizer
                      records={MOCK_RECORDS}
                      reports={[]}
                      onRecordSelect={setSelectedRecord}
                      userLocation={userLocation}
                    />
                  </div>

                  {/* PROJECTS LIST */}
                  <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[350px]">
                    <div className="p-3 border-b border-slate-100 bg-slate-50 flex justify-between items-center shrink-0">
                      <h3 className="font-bold text-slate-800 text-sm">
                        Nearby Projects
                      </h3>
                      <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded-full text-slate-600 font-medium">
                        2 Active
                      </span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                      {MOCK_RECORDS.map((record) => (
                        <div
                          key={record.id}
                          onClick={() => setSelectedRecord(record)}
                          className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                            selectedRecord?.id === record.id
                              ? "bg-slate-900 text-white border-slate-900"
                              : "bg-white border-slate-100 hover:border-blue-300"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span
                              className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                                selectedRecord?.id === record.id
                                  ? "bg-slate-700 text-slate-300"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {record.id}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                record.status === "Completed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {record.status}
                            </span>
                          </div>
                          <h4 className="font-bold text-xs leading-tight mb-1">
                            {record.projectName}
                          </h4>
                          <div
                            className={`text-[10px] ${
                              selectedRecord?.id === record.id
                                ? "text-slate-400"
                                : "text-slate-500"
                            }`}
                          >
                            ₹{(record.budget / 10000000).toFixed(2)} Cr •{" "}
                            {record.contractor}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-2">
                  <div className="p-4 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200 flex justify-between items-center">
                    <div>
                      <p className="text-blue-100 text-[10px] font-bold uppercase">
                        My Contributions
                      </p>
                      <h3 className="text-2xl font-bold">12</h3>
                    </div>
                    <CheckCircle2 size={24} className="text-blue-200" />
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
                    <div>
                      <p className="text-slate-500 text-[10px] font-bold uppercase">
                        Alerts Near Me
                      </p>
                      <h3 className="text-2xl font-bold text-slate-900">3</h3>
                    </div>
                    <AlertTriangle size={24} className="text-orange-500" />
                  </div>

                  {/* NAVIGATE TO CREATE AUDIT PAGE */}
                  <Link href="/createaudit" className="w-full h-full">
                    <button className="group h-full p-4 bg-slate-900 rounded-xl text-white shadow-sm flex items-center justify-between cursor-pointer hover:bg-slate-800 transition-colors w-full text-left">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-700 rounded-lg">
                          <Camera size={18} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm">
                            Create Audit Draft
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Report an issue
                          </span>
                        </div>
                      </div>
                      <ArrowRight
                        className="group-hover:translate-x-1 transition-transform"
                        size={18}
                      />
                    </button>
                  </Link>
                </div>
              </motion.div>
            )}

            {/* --- VIEW: MY REPORTS --- */}
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
                  <Link href="/createaudit">
                    <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-700 transition-all flex items-center gap-2">
                      <AlertTriangle size={16} /> New Report
                    </button>
                  </Link>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-bold text-slate-500">
                      <tr>
                        <th className="px-6 py-4">ID</th>
                        <th className="px-6 py-4">Project</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Risk</th>
                        <th className="px-6 py-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {MY_REPORTS.map((report) => (
                        <tr
                          key={report.id}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-6 py-4 font-mono text-slate-400">
                            {report.id}
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-900">
                            {report.project}
                          </td>
                          <td className="px-6 py-4">
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                              {report.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded text-xs font-bold ${
                                report.risk === "High"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {report.risk}
                            </span>
                          </td>
                          <td className="px-6 py-4">{report.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* --- VIEW: RTI --- */}
            {activeTab === "rti" && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-slate-900">
                  RTI & Complaints
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MY_DOCS.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-blue-400 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                          <FileText size={24} />
                        </div>
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold">
                          {doc.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        {doc.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono mb-4">
                        {doc.id} • {doc.date}
                      </p>
                      <button className="w-full py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors flex items-center justify-center gap-2">
                        <Download size={16} /> Download PDF
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
