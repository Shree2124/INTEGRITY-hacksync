'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { OfficialRecord, Report } from '@/types/types';
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
      const recordsRes = await fetch('/api/records').then(r => r.json());
      const reportsRes = await fetch('/api/reports').then(r => r.json());
      setRecords(recordsRes ?? []);
      setReports(reportsRes ?? []);
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
