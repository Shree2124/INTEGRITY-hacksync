'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { OfficialRecord, Report } from '@/types/types';
import { supabase } from '@/lib/dbConnect';
import '@/lib/leaflet';

const MapVisualizer = dynamic(() => import('@/components/MapView/Mapvisualizer'), {
  ssr: false
});

export default function MapPage() {
  const [records, setRecords] = useState<OfficialRecord[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<OfficialRecord | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  // Get User Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          // Fallback if denied (Mumbai)
          setUserLocation({ lat: 19.0760, lng: 72.8777 });
        }
      );
    }
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/api/map');
        const data = await response.json();

        // Extract projects and reports from the joined data
        const allReports = data ?? [];
        const allProjects = allReports.map((r: any) => r.audit_results?.[0]?.government_projects).filter(Boolean);

        // Also fetch all projects to show ones without reports
        const { data: projectsData } = await supabase.from('government_projects').select('*');

        setRecords(projectsData as unknown as OfficialRecord[] ?? []);
        setReports(allReports);
      } catch (error) {
        console.error("Failed to load map data:", error);
      }
    }
    loadData();
  }, []);

  return (
    <div className="h-screen w-full">
      <MapVisualizer
        records={records}
        reports={reports}
        onRecordSelect={setSelectedRecord}
        userLocation={userLocation}
      />
    </div>
  );
}
