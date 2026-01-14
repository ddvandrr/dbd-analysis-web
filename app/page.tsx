"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import ClusterChart from "@/components/ClusterChart";
import dynamic from "next/dynamic";

const HeatmapChart = dynamic(() => import("@/components/HeatmapChart"), { ssr: false });

import ClusterProfile from "@/components/ClusterProfile";
import RiskRanking from "@/components/RiskRanking";
import AutoRecommendation from "@/components/AutoRecommendation";
import DataTable from "@/components/DataTable";

export default function Dashboard() {
  const [clusterData, setClusterData] = useState<any[]>([]);
  const [heatmapData, setHeatmapData] = useState<any[]>([]);
  const [geoData, setGeoData] = useState<any>(null);
  const [silhouette, setSilhouette] = useState("");

  useEffect(() => {
    fetch("/api/clustering")
      .then(r => r.json())
      .then(r => {
        setClusterData(r.data);
        setSilhouette(r.silhouette);
      });

    fetch("/api/heatmap")
      .then(r => r.json())
      .then(setHeatmapData);

    fetch("/semarang-kecamatan.geojson")
      .then(r => r.json())
      .then(setGeoData);
  }, []);

  return (
    <>
      {/* Stat cards */}
      <section className="section grid-3">
        <StatCard title="Jumlah Kecamatan" value={clusterData.length} />
        <StatCard title="Silhouette Score" value={silhouette} />
        <StatCard title="Metode" value="K-Means + Min-Max" />
      </section>

      {/* Cluster Scatter Chart */}
      <section className="section card">
        <h2>Visualisasi Clustering Risiko</h2>
        <ClusterChart data={clusterData} />

        <div className="legend">
          <span><div className="dot" style={{ background: "var(--low)" }} />Rendah</span>
          <span><div className="dot" style={{ background: "var(--medium)" }} />Sedang</span>
          <span><div className="dot" style={{ background: "var(--high)" }} />Tinggi</span>
        </div>
      </section>

      {/* Heatmap */}
      <section className="section card">
        <h2>Heatmap Wilayah Risiko</h2>
        {geoData && <HeatmapChart geoData={geoData} data={heatmapData} />}
      </section>

      <section className="section card">
        <DataTable data={clusterData} />
      </section>


      {/* Profil Cluster + Ranking + Rekomendasi */}
      <section className="section card">
        <ClusterProfile data={clusterData} />
        <RiskRanking data={clusterData} />
        <AutoRecommendation data={clusterData} />
      </section>

      {/* Unduh laporan PDF */}
      <section style={{ textAlign: "right" }}>
        <a href="/api/laporan" className="button">
          Unduh Laporan PDF
        </a>
      </section>
    </>
  );
}
