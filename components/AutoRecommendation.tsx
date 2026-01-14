export default function AutoRecommendation({ data }: { data: any[] }) {
  const configs = [
    {
      cluster: 2,
      title: "Risiko Tinggi",
      className: "rec high",
      text: "Perlu intervensi segera dan prioritas sumber daya",
    },
    {
      cluster: 1,
      title: "Risiko Sedang",
      className: "rec medium",
      text: "Lakukan monitoring rutin dan evaluasi berkala",
    },
    {
      cluster: 0,
      title: "Risiko Rendah",
      className: "rec low",
      text: "Pertahankan kondisi dan upaya pencegahan",
    },
  ];

  return (
    <div className="card">
      <h3>Rekomendasi Otomatis</h3>

      {configs.map(c => {
        const count = data.filter(d => d.cluster === c.cluster).length;

        return (
          <div key={c.cluster} className={c.className}>
            <strong>{c.title}</strong>
            <p>{c.text}</p>
            <span>{count} kecamatan</span>
          </div>
        );
      })}
    </div>
  );
}
