'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Search, 
  MapPin, 
  X,
  AlertTriangle,
  ArrowRight,
  PieChart,
  TrendingUp,
  Users,
  LocateFixed,
  Activity,
  CheckCircle2
} from 'lucide-react';
// import DashboardHeader from '@/components/DashboardHeader'; 
import { OfficialRecord, Report, RiskLevel, ProjectCategory } from '@/types/types'; 

// --- DYNAMIC MAP IMPORT ---
const MapVisualizer = dynamic(
  () => import('@/components/MapView/Mapvisualizer'), 
  { 
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-slate-100 flex items-center justify-center animate-pulse rounded-xl">
        <div className="flex flex-col items-center gap-3">
           <Building2 className="w-10 h-10 text-slate-300" />
           <p className="text-slate-400 font-medium">Loading Geospatial Engine...</p>
        </div>
      </div>
    )
  }
);

// --- MOCK DATA ---
const MOCK_RECORDS: OfficialRecord[] = [
  {
    id: 'MCGM-2024-001',
    projectName: 'Marine Drive Promenade',
    category: ProjectCategory.ROAD,
    budget: 45000000,
    contractor: 'Mumbai Infra Projects',
    deadline: '2024-06-30',
    status: 'Completed',
    location: { lat: 18.944, lng: 72.823 },
    description: 'Resurfacing of the promenade walkway with anti-skid tiles.'
  },
  {
    id: 'MCGM-2024-002',
    projectName: 'Dadar Station Skywalk',
    category: ProjectCategory.BUILDING,
    budget: 12000000,
    contractor: 'Urban Connectivity',
    deadline: '2024-08-15',
    status: 'In Progress',
    location: { lat: 19.0178, lng: 72.8478 },
    description: 'Structural reinforcement of the east-west pedestrian skywalk.'
  },
  {
    id: 'MCGM-2024-003',
    projectName: 'Andheri East Drainage',
    category: ProjectCategory.SANITATION,
    budget: 85000000,
    contractor: 'CityFlow Engineering',
    deadline: '2024-12-01',
    status: 'In Progress',
    location: { lat: 19.1136, lng: 72.8697 },
    description: 'Installation of larger diameter storm water drains.'
  }
];

const MOCK_REPORTS: Report[] = [
  {
    id: 'REP-001',
    evidence: { timestamp: Date.now(), coordinates: { lat: 19.0178, lng: 72.8478 }, image: '' },
    matchedRecordId: 'MCGM-2024-002',
    status: 'Verified',
    auditResult: { riskLevel: RiskLevel.HIGH, discrepancies: ['Cracks'], reasoning: 'Structural failure.', confidenceScore: 0.92 }
  }
];

export default function DashboardPage() {
  const [selectedRecord, setSelectedRecord] = useState<OfficialRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => setUserLocation({ lat: 19.0760, lng: 72.8777 }) // Default Mumbai
      );
    }
  }, []);

  const filteredRecords = MOCK_RECORDS.filter(r => 
    r.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      
      {/* 1. Header (Uncomment when ready) */}
      {/* <DashboardHeader user={{ name: "Himanshu", email: "user@gov.in", role: "Citizen" }} /> */}

      {/* 2. Main Grid Layout */}
      <div className="flex-1 p-4 lg:p-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* --- LEFT COLUMN: PROJECTS LIST (Span 4) --- */}
          <div className="lg:col-span-4 flex flex-col gap-4 h-full">
             
             {/* Search Card */}
             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-3 font-serif">Projects</h2>
                <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                   <input 
                     type="text" 
                     placeholder="Search projects..." 
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                   />
                </div>
             </div>

             {/* Scrollable List */}
             <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
                <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                   <span className="text-xs font-bold text-slate-500 uppercase">Active Records</span>
                   <span className="text-xs bg-slate-200 px-2 py-0.5 rounded-full text-slate-600">{filteredRecords.length}</span>
                </div>
                <div className="overflow-y-auto p-2 space-y-2 flex-1">
                   {filteredRecords.map(record => (
                     <div 
                       key={record.id}
                       onClick={() => setSelectedRecord(record)}
                       className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${selectedRecord?.id === record.id ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-100 hover:border-slate-300'}`}
                     >
                        <div className="flex justify-between items-start mb-1">
                           <h3 className={`font-bold text-sm leading-tight ${selectedRecord?.id === record.id ? 'text-white' : 'text-slate-800'}`}>{record.projectName}</h3>
                           <span className={`text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap ml-2 ${record.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                             {record.status}
                           </span>
                        </div>
                        <div className={`flex items-center gap-1 text-xs ${selectedRecord?.id === record.id ? 'text-slate-400' : 'text-slate-500'}`}>
                           <MapPin size={10} /> {record.location.lat.toFixed(3)}, {record.location.lng.toFixed(3)}
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          {/* --- RIGHT COLUMN: MAP & ANALYTICS (Span 8) --- */}
          <div className="lg:col-span-8 flex flex-col gap-6">
             
             {/* TOP: MAP WIDGET */}
             <div className="w-full h-[400px] bg-white rounded-2xl shadow-md border border-slate-200 relative z-0 overflow-hidden group">
                {/* Map Header Overlay */}
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                   <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm text-xs font-bold text-slate-700 border border-slate-200 flex items-center gap-2">
                      <LocateFixed size={14} className="text-blue-600" />
                      {userLocation ? "Live Location" : "Locating..."}
                   </div>
                </div>
                
                <MapVisualizer 
                   records={MOCK_RECORDS} 
                   reports={MOCK_REPORTS} 
                   onRecordSelect={setSelectedRecord}
                   userLocation={userLocation} 
                />
             </div>

             {/* BOTTOM: ANALYTICS DASHBOARD */}
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* 1. Compliance Score */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                   <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-bold text-slate-500 uppercase">City Compliance</h3>
                      <Activity size={16} className="text-blue-500" />
                   </div>
                   <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-slate-900">84%</span>
                      <span className="text-xs text-green-600 font-bold mb-1">▲ 2.4%</span>
                   </div>
                   <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-green-400 w-[84%] h-full"></div>
                   </div>
                </div>

                {/* 2. Audit Activity Chart */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                   <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-bold text-slate-500 uppercase">Audit Velocity</h3>
                      <TrendingUp size={16} className="text-green-500" />
                   </div>
                   <div className="flex items-end gap-1 h-12">
                      {[35, 55, 45, 75, 50, 85, 60].map((h, i) => (
                         <div key={i} className="flex-1 bg-green-50 rounded-t-sm relative group overflow-hidden">
                            <div className="absolute bottom-0 w-full bg-green-500 transition-all duration-500" style={{ height: `${h}%` }}></div>
                         </div>
                      ))}
                   </div>
                   <div className="text-[10px] text-slate-400 mt-2 text-right">Last 7 Days</div>
                </div>

                {/* 3. Contractor Leaderboard */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                   <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-bold text-slate-500 uppercase">Top Contractors</h3>
                      <Users size={16} className="text-purple-500" />
                   </div>
                   <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs border-b border-slate-50 pb-2">
                         <span className="text-slate-700 font-medium">Mumbai Infra</span>
                         <div className="flex items-center gap-1">
                            <span className="text-slate-400">92%</span>
                            <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">A</span>
                         </div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                         <span className="text-slate-700 font-medium">CityFlow Eng</span>
                         <div className="flex items-center gap-1">
                            <span className="text-slate-400">85%</span>
                            <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">B+</span>
                         </div>
                      </div>
                   </div>
                </div>

             </div>
          </div>
        </div>
      </div>

      {/* --- DRAWER (Right Side Overlay) --- */}
      <AnimatePresence>
        {selectedRecord && (
          <>
            {/* Backdrop */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedRecord(null)}
               className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
            />
            
            {/* Drawer */}
            <motion.div 
               initial={{ x: "100%" }}
               animate={{ x: 0 }}
               exit={{ x: "100%" }}
               transition={{ type: "spring", damping: 25, stiffness: 200 }}
               className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-50 border-l border-slate-200 overflow-y-auto"
            >
               <div className="sticky top-0 bg-white/95 backdrop-blur z-10 border-b border-slate-200 p-6 flex justify-between items-start">
                  <div>
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Project Details</span>
                     <h2 className="text-2xl font-bold text-slate-900 leading-tight font-serif">{selectedRecord.projectName}</h2>
                     <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded border border-blue-100">
                           {selectedRecord.id}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded">
                           {selectedRecord.category}
                        </span>
                     </div>
                  </div>
                  <button onClick={() => setSelectedRecord(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                     <X size={24} />
                  </button>
               </div>

               <div className="p-6 space-y-8">
                  
                  {/* Key Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="text-xs text-slate-500 font-bold uppercase mb-1">Budget</div>
                        <div className="text-xl font-bold text-slate-900">₹{(selectedRecord.budget/10000000).toFixed(2)} Cr</div>
                     </div>
                     <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="text-xs text-slate-500 font-bold uppercase mb-1">Deadline</div>
                        <div className="text-lg font-bold text-slate-900">{selectedRecord.deadline}</div>
                     </div>
                  </div>

                  {/* Contractor Info */}
                  <div>
                     <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Building2 size={16} className="text-slate-400" /> Contractor
                     </h3>
                     <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center justify-between">
                        <div>
                           <div className="font-bold text-slate-800">{selectedRecord.contractor}</div>
                           <div className="text-xs text-slate-500 mt-1">ID: #INF-992-MUM</div>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                           {selectedRecord.contractor.charAt(0)}
                        </div>
                     </div>
                  </div>

                  {/* Description */}
                  <div>
                     <h3 className="text-sm font-bold text-slate-900 mb-2">Scope of Work</h3>
                     <p className="text-sm text-slate-600 leading-relaxed border-l-2 border-slate-200 pl-4 py-1">
                        {selectedRecord.description}
                     </p>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-6 border-t border-slate-100">
                     <Link href="/auditview" className="block w-full">
                        <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 hover:shadow-xl transition-all flex items-center justify-center gap-2 group">
                           <AlertTriangle size={18} className="text-orange-500 group-hover:text-orange-400 transition-colors" />
                           Initiate Citizen Audit
                           <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                     </Link>
                     <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                        <CheckCircle2 size={12} className="text-green-500" />
                        <span>Verified Official Record</span>
                     </div>
                  </div>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}