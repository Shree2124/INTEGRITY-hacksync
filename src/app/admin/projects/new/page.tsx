'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, MapPin, Loader2 } from 'lucide-react';
import { ProjectCategory } from '@/types/types';

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    category: ProjectCategory.ROAD,
    contractor: '',
    budget: '',
    deadline: '',
    lat: '',
    lng: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    alert("Project Created Successfully!");
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-2xl mx-auto">
        
        <div className="mb-6 flex items-center gap-4">
          <Link href="/admin/dashboard" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Add New Project</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 space-y-6">
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Project Name</label>
            <input 
              name="projectName" required
              value={formData.projectName} onChange={handleChange}
              placeholder="e.g. Andheri Metro Station Upgrade"
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
              <select 
                name="category"
                value={formData.category} onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none"
              >
                {Object.values(ProjectCategory).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Contractor Name</label>
              <input 
                name="contractor" required
                value={formData.contractor} onChange={handleChange}
                placeholder="e.g. L&T Construction"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Budget (₹)</label>
              <input 
                name="budget" type="number" required
                value={formData.budget} onChange={handleChange}
                placeholder="50000000"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Deadline</label>
              <input 
                name="deadline" type="date" required
                value={formData.deadline} onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
              <MapPin size={16} /> Location Coordinates
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <input 
                name="lat" placeholder="Latitude" required
                value={formData.lat} onChange={handleChange}
                className="p-2 border border-slate-300 rounded bg-white text-sm"
              />
              <input 
                name="lng" placeholder="Longitude" required
                value={formData.lng} onChange={handleChange}
                className="p-2 border border-slate-300 rounded bg-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
            <textarea 
              name="description" rows={4}
              value={formData.description} onChange={handleChange}
              placeholder="Scope of work..."
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none resize-none"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><Save size={20}/> Create Project Record</>}
          </button>

        </form>
      </div>
    </div>
  );
}