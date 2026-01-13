"use client";

interface ClusterProfileProps {
  data?: Array<{
    nama_kecamatan: string;
    cluster?: number;
    IR?: number;
    CFR?: number;
  }>;
}

export default function ClusterProfile({ data }: ClusterProfileProps) {
  if (!data || data.length === 0) return <p>Data cluster belum tersedia.</p>;

  const clusters = [0, 1, 2];
  const clusterNames = ["Rendah", "Sedang", "Tinggi"];
  const clusterColors = ["var(--low)", "var(--medium)", "var(--high)"];

  return (
    <section className="section card">
      <h2>Profil Cluster</h2>
      {clusters.map((c) => {
        const items = data.filter((d) => d.cluster === c);
        if (items.length === 0) return null;

        const avgIR =
          items.reduce((sum, d) => sum + (Number(d.IR) || 0), 0) / items.length;
        const avgCFR =
          items.reduce((sum, d) => sum + (Number(d.CFR) || 0), 0) / items.length;

        return (
          <div
            key={c}
            style={{
              borderLeft: `6px solid ${clusterColors[c]}`,
              padding: "12px 16px",
              marginBottom: "16px",
              borderRadius: "12px",
              background: "var(--card)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ marginBottom: "6px" }}>
              {clusterNames[c]} ({items.length} kecamatan)
            </h3>
            <p style={{ marginBottom: "8px", color: "var(--muted)" }}>
              Rata-rata IR: {avgIR.toFixed(2)}, Rata-rata CFR: {avgCFR.toFixed(2)}
            </p>
            <ul style={{ paddingLeft: "20px", margin: 0 }}>
              {items.map((d, i) => (
                <li key={i}>{d.nama_kecamatan}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
