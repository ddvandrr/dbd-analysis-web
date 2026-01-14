"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface ClusterItem {
  nama_kecamatan: string;
  ir: number;
  cfr: number;
  cluster: number;
}

const CLUSTER_COLOR: Record<number, string> = {
  0: "#22c55e",
  1: "#facc15",
  2: "#ef4444",
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
  const dataMap = new Map(
    data.map(d => [normalize(d.nama_kecamatan), d])
  );

  // ======================
  // BASE STYLE
  // ======================
  const baseStyle = (feature: any): L.PathOptions => {
    const kec = dataMap.get(
      normalize(feature.properties.nm_kecamatan)
    );

    return {
      fillColor: kec ? CLUSTER_COLOR[kec.cluster] : "#e5e7eb",
      weight: 0.4,
      color: "#ffffff",
      fillOpacity: 0.75,
      className: "geo-base",
    };
  };

  // ======================
  // HOVER STYLE (FAKE 3D)
  // ======================
  const hoverStyle: L.PathOptions = {
    fillOpacity: 0.9,
    weight: 0.4,
    color: "#ffffff",
    className: "geo-3d",
  };

  // ======================
  // EVENTS
  // ======================
  const onEachFeature = (feature: any, layer: L.Layer) => {
    const kec = dataMap.get(
      normalize(feature.properties.nm_kecamatan)
    );

    layer.bindTooltip(
      `
      <strong>${feature.properties.nm_kecamatan}</strong><br/>
      IR: ${kec?.ir?.toFixed(2) ?? "-"}<br/>
      CFR: ${kec?.cfr?.toFixed(2) ?? "-"}<br/>
      Klaster: ${kec ? CLUSTER_LABEL[kec.cluster] : "-"}
      `,
      { sticky: true }
    );

    layer.on({
      mouseover: (e: L.LeafletMouseEvent) => {
        const target = e.target as L.Path;
        target.setStyle(hoverStyle);
        target.bringToFront();
      },
      mouseout: (e: L.LeafletMouseEvent) => {
        const target = e.target as L.Path;
        target.setStyle(baseStyle(feature));
      },
    });
  };

  return (
    <div className="map-container" style={{ height: "500px" }}>
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
          style={baseStyle}
          onEachFeature={onEachFeature}
        />
      </MapContainer>

      {/* 🎨 3D EFFECT TANPA GARIS HITAM */}
      <style jsx global>{`
        .geo-base {
          transition: filter 0.15s ease, opacity 0.15s ease;
        }

        .geo-3d {
          filter:
            drop-shadow(0 10px 16px rgba(0, 0, 0, 0.3))
            brightness(1.06);
        }
      `}</style>
    </div>
  );
}
