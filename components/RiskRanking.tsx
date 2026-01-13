"use client";

interface RiskRankingProps {
  data?: Array<{
    nama_kecamatan: string;
    IR?: number;
    CFR?: number;
    cluster?: number;
  }>;
}

export default function RiskRanking({ data }: RiskRankingProps) {
  if (!data || data.length === 0) return <p>Data risiko belum tersedia.</p>;

  const clusterColors = ["var(--low)", "var(--medium)", "var(--high)"];

  // Ranking berdasarkan IR + CFR
  const ranked = [...data].sort(
    (a, b) => ((b.IR ?? 0) + (b.CFR ?? 0)) - ((a.IR ?? 0) + (a.CFR ?? 0))
  );

  return (
    <section className="section card">
      <h2>Ranking Kecamatan Risiko</h2>
      <ol style={{ paddingLeft: "0", margin: 0, listStyle: "none" }}>
        {ranked.map((d, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              marginBottom: "8px",
              borderRadius: "12px",
              background: "var(--card)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
              borderLeft: d.cluster !== undefined ? `6px solid ${clusterColors[d.cluster]}` : "none",
            }}
          >
            <span>
              {i + 1}. <strong>{d.nama_kecamatan}</strong>
            </span>
            <span style={{ color: "var(--muted)" }}>
              IR: {(Number(d.IR) ?? 0).toFixed(2)} | CFR: {(Number(d.CFR) ?? 0).toFixed(2)}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
