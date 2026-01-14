"use client";

import "@/lib/leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import { OfficialRecord, Report, RiskLevel } from "@/types/types";
import { MAP_CENTER } from "@/lib/constants";
import RandomMarkers from "./RandomMarkers";

interface Props {
  records?: OfficialRecord[];
  reports?: Report[];
  onRecordSelect: (record: OfficialRecord) => void;
}

const getColorForRisk = (risk?: RiskLevel) => {
  switch (risk) {
    case RiskLevel.HIGH:
      return "#ef4444";
    case RiskLevel.MEDIUM:
      return "#f59e0b";
    case RiskLevel.LOW:
      return "#22c55e";
    default:
      return "#94a3b8";
  }
};

export default function MapVisualizer({
  records = [],
  reports = [],
  onRecordSelect,
}: Props) {
  return (
    <div className="h-full w-full">
      <MapContainer
        center={[MAP_CENTER.lat, MAP_CENTER.lng]}
        zoom={14}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RandomMarkers center={[MAP_CENTER.lat, MAP_CENTER.lng]} count={20} />
        {records.map((record) => (
          <Marker
            key={record.id}
            position={[record.location.lat, record.location.lng]}
            eventHandlers={{ click: () => onRecordSelect(record) }}
          >
            <Popup>{record.projectName}</Popup>
          </Marker>
        ))}

        {reports.map((report) => (
          <CircleMarker
            key={report.id}
            center={[
              report.evidence.coordinates.lat,
              report.evidence.coordinates.lng,
            ]}
            radius={12}
            pathOptions={{
              color: "white",
              weight: 2,
              fillColor: getColorForRisk(report.auditResult?.riskLevel),
              fillOpacity: 0.8,
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
