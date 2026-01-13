"use client";

interface AutoRecommendationProps {
  data?: Array<{
    nama_kecamatan: string;
    cluster?: number;
  }>;
}

export default function AutoRecommendation({ data }: AutoRecommendationProps) {
  if (!data || data.length === 0) return <p>Rekomendasi otomatis belum tersedia.</p>;

  const clusters = [0, 1, 2];
  const clusterNames = ["Rendah", "Sedang", "Tinggi"];

  const grouped = clusters.map((c) => {
    const kecamatan = data.filter((d) => d.cluster === c).map((d) => d.nama_kecamatan);
    let rec = "";

    if (c === 2) rec = "Segera lakukan intervensi, fokus pengendalian penyakit.";
    else if (c === 1) rec = "Tingkatkan pemantauan, edukasi masyarakat, dan pengendalian vektor.";
    else rec = "Pertahankan pengendalian rutin dan monitoring berkala.";

    return { clusterName: clusterNames[c], kecamatan, recommendation: rec };
  });

  return (
    <section className="section card">
      <h2>Rekomendasi Otomatis</h2>
      {grouped.map((g, i) => (
        <div key={i} className="recommendation">
          <h3>{g.clusterName}</h3>
          <p>{g.recommendation}</p>
          {g.kecamatan.length > 0 && (
            <ul>
              {g.kecamatan.map((k, j) => (
                <li key={j}>{k}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}
