"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

export default function MapComponent() {
  // Fixed coordinates for Punjab, India
  const position = [30.9000, 75.8573];

  return (
    <div className="map-card">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap Contributors"
        />

        <Marker position={position}>
          <Popup>
            <div style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
              <strong style={{ color: '#ffd700', display: 'block', marginBottom: '4px' }}>
                Shubhangkar Saha
              </strong>
              <div style={{ fontSize: '12px', color: '#333' }}>
                India, LPU, Punjab
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

