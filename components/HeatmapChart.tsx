"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface ClusterItem {
  nama_kecamatan: string;
  ir: number;
  cfr: number;
  cluster: number;
}

const CLUSTER_COLOR: Record<number, string> = {
  0: "#22c55e", // rendah
  1: "#facc15", // sedang
  2: "#ef4444", // tinggi
};

const CLUSTER_LABEL: Record<number, string> = {
  0: "Rendah",
  1: "Sedang",
  2: "Tinggi",
};

const normalize = (s = "") =>
  s.toLowerCase().replace(/\s+/g, "");

export default function HeatmapChart({
  geoData,
  data,
}: {
  geoData: any;
  data: ClusterItem[];
}) {
  const style = (feature: any) => {
    const kec = data.find(
      d =>
        normalize(d.nama_kecamatan) ===
        normalize(feature.properties.nama_kecamatan)
    );

    return {
      fillColor: kec ? CLUSTER_COLOR[kec.cluster] : "#e5e7eb",
      weight: 1,
      color: "#ffffff",
      fillOpacity: 0.75,
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    const kec = data.find(
      d =>
        normalize(d.nama_kecamatan) ===
        normalize(feature.properties.nama_kecamatan)
    );

    layer.bindTooltip(
      `
      <strong>${feature.properties.nama_kecamatan}</strong><br/>
      IR: ${kec?.ir?.toFixed(2) ?? "-"}<br/>
      CFR: ${kec?.cfr?.toFixed(2) ?? "-"}<br/>
      Klaster: ${kec ? CLUSTER_LABEL[kec.cluster] : "-"}
      `,
      { sticky: true }
    );
  };

  return (
    <div className="map-container">
      <MapContainer
        center={[-6.97, 110.42]}
        zoom={11}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <GeoJSON
          data={geoData}
          style={style}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  );
}
