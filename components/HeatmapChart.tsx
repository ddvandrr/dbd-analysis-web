"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface HeatmapChartProps {
  geoData: any;  // GeoJSON
  data: Array<{
    nama_kecamatan: string;
    cluster: number;  // 0, 1, 2
    IR: number;
    CFR: number;
  }>;
}

export default function HeatmapChart({ geoData, data }: HeatmapChartProps) {
  const [geo, setGeo] = useState<any>(null);

  useEffect(() => {
    setGeo(geoData);
  }, [geoData]);

  const getColor = (cluster: number) => {
    switch (cluster) {
      case 0: return "#16a34a"; // Rendah
      case 1: return "#eab308"; // Sedang
      case 2: return "#dc2626"; // Tinggi
      default: return "#ccc";
    }
  };

  const style = (feature: any) => {
    const kec = data.find(d => d.nama_kecamatan === feature.properties.nama_kecamatan);
    return {
      fillColor: kec ? getColor(kec.cluster) : "#ccc",
      weight: 1,
      color: "#ffffff",
      fillOpacity: 0.7,
    };
  };

  if (!geo) return <p>Memuat peta...</p>;

  return (
    <MapContainer
      center={[-6.9667, 110.4167]} // koordinat Semarang
      zoom={11}
      style={{ height: 400, width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <GeoJSON data={geo} style={style} />
    </MapContainer>
  );
}
