"use client";

import "@/lib/leaflet";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/dbConnect";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { Navigation } from "lucide-react";
import { OfficialRecord, Report, RiskLevel } from "@/types/types";
import { MAP_CENTER } from "@/lib/constants";
import RandomMarkers from "./RandomMarkers";

interface Props {
  records?: OfficialRecord[];
  reports?: Report[];
  onRecordSelect: (record: OfficialRecord) => void;
  userLocation?: { lat: number; lng: number } | null;
}

const getColorForRisk = (risk?: string) => {
  switch (risk) {
    case "High":
      return "#ef4444";
    case "Medium":
      return "#f59e0b";
    case "Low":
      return "#22c55e";
    default:
      return "#94a3b8";
  }
};

const createUserIcon = () => {
  if (typeof window === "undefined") return L.divIcon({});

  const iconHtml = renderToStaticMarkup(
    <div className="relative flex items-center justify-center w-8 h-8">
      <div className="absolute w-full h-full bg-blue-500 rounded-full opacity-40 animate-ping"></div>
      <div className="relative w-5 h-5 bg-blue-600 rounded-full border-2 border-white shadow-xl flex items-center justify-center">
        <Navigation size={12} className="text-white fill-current" />
      </div>
    </div>
  );

  return L.divIcon({
    html: iconHtml,
    className: "custom-user-marker",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const MapController = ({
  center,
}: {
  center?: { lat: number; lng: number } | null;
}) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo([center.lat, center.lng], 15, { animate: true });
    }
  }, [center, map]);
  return null;
};

export default function MapVisualizer({
  records = [],
  reports: initialReports = [],
  onRecordSelect,
  userLocation,
}: Props) {
  const [reports, setReports] = useState<any[]>(initialReports);

  // Sync with props
  useEffect(() => {
    setReports(initialReports);
  }, [initialReports]);



  // Determine center for random markers (User Location -> Default Map Center)
  const randomMarkersCenter: [number, number] = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [MAP_CENTER.lat, MAP_CENTER.lng];

  return (
    <div className="h-full w-full">
      <MapContainer
        center={
          userLocation
            ? [userLocation.lat, userLocation.lng]
            : [MAP_CENTER.lat, MAP_CENTER.lng]
        }
        zoom={14}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapController center={userLocation} />

        {/* Updated: Random markers now center on the user if available */}
        <RandomMarkers center={randomMarkersCenter} count={20} />

        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={createUserIcon()}
          >
            <Popup>
              <div className="text-xs font-bold text-blue-600">
                You are here
              </div>
            </Popup>
          </Marker>
        )}
        {records.map((record: any) => (
          <Marker
            key={record.id}
            position={[record.latitude, record.longitude]}
            eventHandlers={{ click: () => onRecordSelect(record) }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-sm">{record.project_name}</h3>
                <p className="text-xs text-slate-500">₹{(record.budget / 10000000).toFixed(2)}Cr</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {reports.map((report: any) => {
          const audit = report.audit_results?.[0];
          return (
            <CircleMarker
              key={report.id}
              center={[
                report.latitude,
                report.longitude,
              ]}
              radius={12}
              pathOptions={{
                color: "white",
                weight: 2,
                fillColor: getColorForRisk(audit?.risk_level),
                fillOpacity: 0.8,
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-sm">Citizen Report</h3>
                  <p className="text-xs text-slate-500">{audit?.ai_verdict || "Pending Audit"}</p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
