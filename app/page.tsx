"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import StatCard from "@/components/StatCard";
import ClusterChart from "@/components/ClusterChart";
import ClusterProfile from "@/components/ClusterProfile";
import RiskRanking from "@/components/RiskRanking";
import AutoRecommendation from "@/components/AutoRecommendation";
import DataTable from "@/components/DataTable";

import type { Cluster } from "@/types/cluster";

// ======================
// TYPES
// ======================
interface KecamatanRaw {
  kode_kecamatan: string;
  nama_kecamatan: string;
  jumlah_penduduk: number;
  total_penderita: number;
  total_meninggal: number;
  ir: number;
  cfr: number;
  cluster?: Cluster; // boleh undefined dari API
}

interface KecamatanClustered extends Omit<KecamatanRaw, "cluster"> {
  cluster: Cluster; // ✅ WAJIB
}

// ======================
// DYNAMIC IMPORT
// ======================
const HeatmapChart = dynamic(
  () => import("@/components/HeatmapChart"),
  { ssr: false }
);

export default function Dashboard() {
  const [clusterData, setClusterData] = useState<KecamatanClustered[]>([]);
  const [geoData, setGeoData] = useState<any>(null);
  const [silhouette, setSilhouette] = useState<number | null>(null);

  useEffect(() => {
    // ======================
    // FETCH CLUSTERING
    // ======================
    fetch("/api/clustering")
      .then(r => r.json())
      .then(r => {
        if (Array.isArray(r.data)) {
          // 🔴 TYPE NARROWING DI SINI
          const clustered = r.data.filter(
            (d: KecamatanRaw): d is KecamatanClustered =>
              d.cluster !== undefined
          );

          setClusterData(clustered);
        }

        setSilhouette(
          typeof r.silhouette === "number"
            ? r.silhouette
            : null
        );
      })
      .catch(err =>
        console.error("Error fetching clustering:", err)
      );

    // ======================
    // FETCH GEOJSON
    // ======================
    fetch("/semarang_kecamatan.geojson")
      .then(r => r.json())
      .then(setGeoData)
      .catch(err =>
        console.error("Error fetching geojson:", err)
      );
  }, []);

  return (
    <>
      {/* ===================== */}
      {/* STAT CARDS            */}
      {/* ===================== */}
      <section className="section grid-3">
        <StatCard title="Jumlah Kecamatan" value={clusterData.length} />
        <StatCard
          title="Silhouette Score"
          value={silhouette !== null ? silhouette.toFixed(2) : "-"}
        />
        <StatCard title="Metode" value="K-Means + Min-Max" />
      </section>

      {/* ===================== */}
      {/* CLUSTER SCATTER       */}
      {/* ===================== */}
      <section className="section card">
        <h2>Visualisasi Clustering Risiko</h2>

        {clusterData.length > 0 && (
          <ClusterChart data={clusterData} />
        )}

        <div className="legend">
          <span><div className="dot" style={{ background: "var(--low)" }} /> Rendah</span>
          <span><div className="dot" style={{ background: "var(--medium)" }} /> Sedang</span>
          <span><div className="dot" style={{ background: "var(--high)" }} /> Tinggi</span>
        </div>
      </section>

      {/* ===================== */}
      {/* HEATMAP               */}
      {/* ===================== */}
      <section className="section card">
        <h2>Peta Klaster Risiko Kecamatan</h2>

        {geoData && clusterData.length > 0 ? (
          <HeatmapChart geoData={geoData} data={clusterData} />
        ) : (
          <p>Memuat peta...</p>
        )}
      </section>

      {/* ===================== */}
      {/* DATA TABLE            */}
      {/* ===================== */}
      <section className="section card">
        <h2>Data Rekap Kecamatan</h2>
        <DataTable data={clusterData} />
      </section>

      {/* ===================== */}
      {/* ANALISIS LANJUTAN      */}
      {/* ===================== */}
      <section className="section">
        <ClusterProfile data={clusterData} />
      </section>

      <section className="section">
        <RiskRanking data={clusterData} />
      </section>

      <section className="section">
        <AutoRecommendation data={clusterData} />
      </section>

      {/* ===================== */}
      {/* EXPORT PDF            */}
      {/* ===================== */}
      <section style={{ textAlign: "right" }}>
        <a href="/api/laporan" className="button">
          Unduh Laporan PDF
        </a>
      </section>
    </>
  );
}
