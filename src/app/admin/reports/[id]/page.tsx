'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  User, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Activity
} from 'lucide-react';
import { useParams } from 'next/navigation';

export default function ReportDetailPage() {
  const params = useParams();
  const id = params?.id;

  // State for dynamic status updates
  const [status, setStatus] = useState<'Verified' | 'Resolved' | 'Rejected'>('Verified');

  // Mock Data Fetch based on ID
  const report = {
    id: id,
    project: 'Dadar Station Skywalk Repair',
    projectId: 'MCGM-002',
    location: { lat: 19.0178, lng: 72.8478, address: 'Senapati Bapat Marg, Dadar West' },
    submittedBy: 'Rahul S. (Citizen)',
    submittedAt: '2025-10-12 14:30',
    riskLevel: 'HIGH',
    aiVerdict: {
      score: 95,
      confidence: 0.98,
      summary: 'Visual analysis detects critical structural fatigue. The crack propagation pattern suggests shear failure risk on Pillar #4.',
      discrepancies: ['Major structural cracks (>5mm width)', 'Exposed Rebar', 'Water seepage signs'],
      recommendation: 'Immediate structural audit required. Cordon off the area below Pillar #4.'
    },
    evidenceImage: 'https://images.unsplash.com/photo-1618477202872-89cec6f8d62e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D',
  };

  const handleStatusChange = (newStatus: 'Resolved' | 'Rejected') => {
    // Ideally, this would make an API call
    setStatus(newStatus);
    alert(`Report marked as ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900">Report #{id}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                  status === 'Verified' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                  status === 'Resolved' ? 'bg-green-100 text-green-700 border-green-200' :
                  'bg-red-100 text-red-700 border-red-200'
                }`}>
                  {status}
                </span>
              </div>
              <p className="text-slate-500 text-sm mt-1">Submitted on {report.submittedAt}</p>
            </div>
          </div>
          
          {/* Action Buttons (Only show if not already finalized) */}
          {status === 'Verified' && (
            <div className="flex gap-2">
              <button 
                onClick={() => handleStatusChange('Rejected')}
                className="px-4 py-2 bg-white border border-red-200 text-red-600 font-bold rounded-lg hover:bg-red-50 flex items-center gap-2 transition-colors"
              >
                <XCircle size={18} /> Reject
              </button>
              <button 
                onClick={() => handleStatusChange('Resolved')}
                className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 flex items-center gap-2 shadow-sm transition-colors"
              >
                <CheckCircle2 size={18} /> Mark Resolved
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Details & AI */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* AI Analysis Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
              {/* Risk Level Indicator Strip */}
              <div className={`absolute top-0 left-0 w-1 h-full ${report.riskLevel === 'HIGH' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                    <ShieldAlert className={report.riskLevel === 'HIGH' ? 'text-red-600' : 'text-yellow-600'} /> 
                    AI Risk Assessment
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Powered by IntegrityAI™ Vision Model</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-slate-900">{report.aiVerdict.score}<span className="text-sm text-slate-400">/100</span></div>
                  <div className="text-xs font-bold text-red-600 uppercase tracking-wide">Critical Risk</div>
                </div>
              </div>

              {/* Confidence Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-slate-600">Model Confidence</span>
                  <span className="text-slate-900 font-mono">{(report.aiVerdict.confidence * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${report.aiVerdict.confidence * 100}%` }}></div>
                </div>
              </div>

              {/* Analysis Text */}
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-2">
                    <Activity size={14} /> Analysis Summary
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {report.aiVerdict.summary}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Detected Anomalies</h4>
                    <div className="flex flex-wrap gap-2">
                      {report.aiVerdict.discrepancies.map((d, i) => (
                        <span key={i} className="px-2.5 py-1.5 bg-red-50 border border-red-100 rounded-md text-xs font-medium text-red-700 flex items-center gap-1">
                          <AlertTriangle size={10} /> {d}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Action Plan</h4>
                    <p className="text-sm text-slate-600 italic border-l-2 border-blue-200 pl-3">
                      "{report.aiVerdict.recommendation}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence Image */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 font-bold text-slate-800 flex justify-between items-center">
                <span>Visual Evidence</span>
                <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded">Metadata Verified</span>
              </div>
              <div className="relative group">
                <img src={report.evidenceImage} alt="Evidence" className="w-full h-auto object-cover max-h-[500px]" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 bg-white text-slate-900 px-4 py-2 rounded-lg font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">
                    View Full Resolution
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Meta Info */}
          <div className="space-y-6">
            
            {/* Project Context */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide border-b border-slate-100 pb-2">
                Project Context
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-500 font-bold">Project Name</label>
                  <Link href={`/admin/projects/${report.projectId}`} className="block font-medium text-blue-600 hover:underline mt-0.5">
                    {report.project}
                  </Link>
                  <div className="text-xs text-slate-400 font-mono mt-1">ID: {report.projectId}</div>
                </div>
                
                <div>
                  <label className="text-xs text-slate-500 font-bold">Location</label>
                  <div className="flex items-start gap-2 mt-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <MapPin size={16} className="text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm text-slate-700 font-medium">{report.location.address}</div>
                      <div className="text-xs text-slate-400 mt-1 font-mono">{report.location.lat}, {report.location.lng}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reporter Profile */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide border-b border-slate-100 pb-2">
                Reporter
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                  <User size={20} />
                </div>
                <div>
                  <div className="font-medium text-slate-900">{report.submittedBy}</div>
                  <div className="text-xs text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded inline-block mt-0.5">High Trust Score</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-xs text-slate-500 flex justify-between">
                  <span>Citizen ID:</span>
                  <span className="font-mono text-slate-700">#CIT-8821</span>
                </div>
                <div className="text-xs text-slate-500 flex justify-between">
                  <span>History:</span>
                  <span className="text-slate-700">12 Reports (9 Verified)</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <Calendar size={14} /> Reported: {report.submittedAt.split(' ')[0]}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}