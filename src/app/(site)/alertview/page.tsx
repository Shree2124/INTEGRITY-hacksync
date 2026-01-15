'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/dbConnect';

export default function AlertsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAlerts() {
      try {
        const response = await fetch('/api/map');
        const data = await response.json();
        const highRisk = data.filter((r: any) => r.audit_results?.[0]?.risk_level === 'High');
        setReports(highRisk);
      } catch (error) {
        console.error("Failed to load alerts:", error);
      } finally {
        setLoading(false);
      }
    }
    loadAlerts();

    const channel = supabase
      .channel('realtime-alerts')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'audit_results' },
        () => loadAlerts()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const highRiskReports = reports;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="container mx-auto max-w-3xl pt-8 px-4 pb-24">

        <div className="flex items-center gap-2 mb-8">
          <Link
            href="/dashboard"
            className="text-sm text-blue-600 font-medium flex items-center gap-1 hover:underline transition-all"
          >
            <ArrowLeft size={16} /> Back to Homepage
          </Link>
        </div>

        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 font-serif flex items-center gap-2">
              Actionable Alerts
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </h1>
            <p className="text-slate-500 mt-2">High-risk discrepancies requiring immediate attention.</p>
          </div>
          <div className="hidden sm:block text-right">
            <div className="text-2xl font-bold text-red-600">{highRiskReports.length}</div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Critical Issues</div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <Clock className="animate-spin w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p className="text-slate-400">Loading alerts...</p>
          </div>
        ) : highRiskReports.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-green-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">All Clear!</h3>
            <p className="text-slate-500">No active high-risk alerts at the moment.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {highRiskReports.map((report, index) => {
              const audit = report.audit_results?.[0];
              const project = audit?.government_projects;
              if (!project) return null;

              return (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden group"
                >
                  <div className="bg-red-50 border-b border-red-100 px-6 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                      <ShieldAlert size={16} />
                      CRITICAL RISK DETECTED
                    </div>
                    <div className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${report.status === 'Verified' ? 'bg-white text-green-700 border-green-200' :
                      report.status === 'Audited' ? 'bg-white text-blue-700 border-blue-200' :
                        'bg-white text-slate-600 border-slate-200'
                      }`}>
                      {report.status}
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Project Info */}
                    <div className="mb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-xl text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">
                            {project.project_name}
                          </h3>
                          <p className="text-xs font-mono text-slate-400">ID: {project.id.slice(0, 8)}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-slate-400 block mb-1">Contractor</span>
                          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                            {project.contractor}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-6 relative">
                      <div className="absolute top-4 left-4 text-slate-300">
                        <AlertTriangle size={20} />
                      </div>
                      <p className="text-sm text-slate-700 italic pl-8 leading-relaxed">
                        "{audit.ai_verdict}"
                      </p>
                      <div className="flex gap-2 mt-3 pl-8">
                        {audit.discrepancies?.map((d: string, i: number) => (
                          <span key={i} className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-1 rounded border border-red-200">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link href={`/auditview`} className="w-full">
                      <button
                        className="w-full py-3 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                      >
                        View Full Audit Report <ArrowRight size={16} />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}