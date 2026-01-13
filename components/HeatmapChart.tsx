"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { PathOptions } from "leaflet";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then(m => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then(m => m.TileLayer),
  { ssr: false }
);
const GeoJSON = dynamic(
  () => import("react-leaflet").then(m => m.GeoJSON),
  { ssr: false }
);

interface Props {
  data: {
    kecamatan: string;
    cluster: number;
  }[];
}

export default function HeatmapChart({ data }: Props) {
  const [geo, setGeo] = useState<any>(null);

  useEffect(() => {
    fetch("/api/heatmap")
      .then(res => res.json())
      .then(setGeo);
  }, []);

  const getColor = (cluster: number) => {
    if (cluster === 2) return "#dc2626"; // tinggi
    if (cluster === 1) return "#f59e0b"; // sedang
    return "#16a34a";                   // rendah
  };

  const style = (feature: any): PathOptions => {
    const kec = feature.properties?.kecamatan;
    const found = data.find(d => d.kecamatan === kec);

    return {
      fillColor: getColor(found?.cluster ?? 0),
      weight: 1,
      opacity: 1,
      color: "#ffffff",
      fillOpacity: 0.75,
    };
  };

  if (!geo) return null;

  return (
    <section className="card">
      <h2>Heatmap Risiko Wilayah</h2>
      <MapContainer
        center={[-6.97, 110.42]}
        zoom={11}
        style={{ height: 420, borderRadius: 12 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={geo} style={style} />
      </MapContainer>
    </section>
  );
}
