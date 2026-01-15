    'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, XCircle, Download } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function RTIDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [status, setStatus] = useState<'Pending' | 'Approved' | 'Rejected'>('Pending');

  const rtiData = {
    id: id,
    subject: 'Request for Tender Docs - Dadar Skywalk',
    citizen: 'Rahul S.',
    date: '2025-10-12',
    content: `To the Public Information Officer,\n\nMunicipal Corporation of Greater Mumbai (MCGM)\n\nSubject: Application under Right to Information Act, 2005.\n\nRespected Sir/Madam,\n\nI request you to kindly provide the following information regarding the Dadar Station Skywalk Repair project (ID: MCGM-002):\n\n1. Copy of the original tender document issued.\n2. Details of the winning bid and contractor selection criteria.\n3. Inspection reports from the last 6 months.\n\nI am attaching the application fee payment proof.\n\nSincerely,\nRahul S.`
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-3xl mx-auto">
        
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">RTI Request Review</h1>
              <p className="text-sm text-slate-500">ID: {id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setStatus('Rejected')}
              className="px-4 py-2 border border-red-200 bg-red-50 text-red-700 font-bold rounded-lg hover:bg-red-100 flex items-center gap-2"
            >
              <XCircle size={18} /> Reject
            </button>
            <button 
              onClick={() => setStatus('Approved')}
              className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <CheckCircle size={18} /> Approve & Forward
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
          <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">{rtiData.subject}</h2>
              <div className="text-sm text-slate-500">From: <span className="font-semibold text-slate-700">{rtiData.citizen}</span> • {rtiData.date}</div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
              status === 'Approved' ? 'bg-green-100 text-green-700' : 
              status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {status}
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 font-mono text-sm text-slate-800 whitespace-pre-wrap leading-relaxed shadow-inner">
            {rtiData.content}
          </div>

          <div className="mt-6 flex justify-end">
            <button className="text-blue-600 font-bold text-sm flex items-center gap-2 hover:underline">
              <Download size={16} /> Download as PDF
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}